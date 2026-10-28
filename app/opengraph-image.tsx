import { ImageResponse } from "next/og"
import { join } from "node:path"
import { readFile } from "node:fs/promises"

export const alt = "Enabled Analytics — Complete Suite of Salesforce Solutions in One Place"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const logo = `data:image/png;base64,${await readFile(join(process.cwd(), "public/images/brand/logo.png"), "base64")}`

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #eef5fa 0%, #ffffff 55%, #fbf8f4 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} width={420} height={93} alt="" />
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 22, letterSpacing: 4, color: "#246696", textTransform: "uppercase" }}>Salesforce Consulting Partner</div>
          <div style={{ fontSize: 64, fontWeight: 800, color: "#0f1b26", lineHeight: 1.1, maxWidth: 960 }}>
            Complete Suite of Salesforce Solutions in One Place
          </div>
        </div>
        <div style={{ display: "flex", gap: 40, fontSize: 26, color: "#4a5866" }}>
          <span>4.9 CSAT Score</span>
          <span>100+ Global Clients</span>
          <span>150+ Projects</span>
        </div>
      </div>
    ),
    size
  )
}
