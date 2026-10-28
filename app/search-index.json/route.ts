import { buildSearchIndex } from "@/lib/search-index"

// Prerendered at build time; fetched by the search panel on first open.
export function GET() {
  return Response.json(buildSearchIndex())
}
