import { geoGraticule10, geoNaturalEarth1, geoPath } from "d3-geo"
import { feature } from "topojson-client"
import type { FeatureCollection, MultiPolygon, Polygon } from "geojson"
import type { Topology } from "topojson-specification"
import land110 from "world-atlas/land-110m.json"
import { locations } from "@/lib/locations"
import { GlobalMap, type MapPin } from "@/components/story/global-map"

const W = 1000
const H = 470

/**
 * ABSYZ "how we are growing" world map, rebuilt. All geography is projected at
 * build time here (server component), so the client only receives SVG path
 * strings and pin coordinates for the animated map.
 */
export function GlobalPresence() {
  const topo = land110 as unknown as Topology
  const land = feature(topo, topo.objects.land) as unknown as FeatureCollection<Polygon | MultiPolygon>
  // Natural Earth projection, cropped below ~58°S so Antarctica does not dominate.
  const projection = geoNaturalEarth1().fitExtent(
    [
      [0, 0],
      [W, H + 120],
    ],
    land
  )
  const path = geoPath(projection)
  const landPath = path(land) ?? ""
  const graticule = path(geoGraticule10()) ?? ""

  const pins: MapPin[] = locations.map((l) => {
    const [x, y] = projection([l.lon, l.lat]) ?? [0, 0]
    return { ...l, x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 }
  })
  const hq = pins.find((p) => p.kind === "HQ")!
  // Arcs from HQ: quadratic curves lifted by distance for a flight-path look.
  const arcs = pins
    .filter((p) => p.id !== hq.id)
    .map((p) => {
      const mx = (hq.x + p.x) / 2
      const my = (hq.y + p.y) / 2 - Math.min(170, Math.hypot(p.x - hq.x, p.y - hq.y) * 0.32)
      return { id: p.id, d: `M${hq.x},${hq.y} Q${mx.toFixed(1)},${my.toFixed(1)} ${p.x},${p.y}` }
    })

  return <GlobalMap width={W} height={H} landPath={landPath} graticule={graticule} pins={pins} arcs={arcs} />
}
