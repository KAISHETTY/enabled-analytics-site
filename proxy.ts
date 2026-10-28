import { NextResponse, type NextRequest } from "next/server"
import data from "@/content/site-content.json"
import { caseStudies } from "@/lib/case-studies"

// Dynamic segments stream under Partial Prerendering, so notFound() inside the
// page can no longer change the status code. Reject unknown slugs here instead.
const known: Record<string, Set<string>> = {
  services: new Set(data.services.map((s) => s.slug)),
  "case-studies": new Set(caseStudies.map((c) => c.slug)),
  blog: new Set([
    "choosing-between-salesforce-managed-services-vs-in-house-teams",
    "salesforce-for-retail-drive-customer-experience-loyalty",
    "try-salesforce-for-customer-retention",
    "7-reasons-to-choose-salesforce-marketing-cloud",
  ]),
}

export function proxy(request: NextRequest) {
  const [, section, slug, ...rest] = request.nextUrl.pathname.split("/")
  if (rest.length > 0 || !known[section]?.has(slug)) {
    return NextResponse.rewrite(new URL("/__not-found", request.url), { status: 404 })
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/services/:slug+", "/case-studies/:slug+", "/blog/:slug+"],
}
