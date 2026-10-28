import type { NextConfig } from "next"
import createMDX from "@next/mdx"

const serviceSlugs = [
  "coe-teams",
  "org-assessment",
  "data-analytics",
  "sales-cloud",
  "service-cloud",
  "marketing-cloud",
  "account-engagement",
  "experience-cloud",
  "cpq",
]

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  poweredByHeader: false,
  // Size the static-generation worker pool to free RAM (low-memory dev machines).
  experimental: { memoryBasedWorkersCount: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Dreamforce session thumbnail served by Salesforce+.
    remotePatterns: [{ protocol: "https", hostname: "wp.sfdcdigital.com", pathname: "/bxp/wp-content/uploads/**" }],
  },
  // Keep the old Wix URLs working (and their SEO value) after the move.
  async redirects() {
    return [
      { source: "/home-beta", destination: "/", permanent: true },
      { source: "/projects", destination: "/case-studies", permanent: true },
      { source: "/projects/:slug", destination: "/case-studies", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/blogs", destination: "/blog", permanent: true },
      { source: "/post/:slug", destination: "/blog/:slug", permanent: true },
      { source: "/practice-area", destination: "/services", permanent: true },
      { source: "/industry", destination: "/industries", permanent: true },
      { source: "/privacy-policy", destination: "/privacy", permanent: true },
      { source: "/apply-now", destination: "/careers#apply", permanent: true },
      { source: "/coeenablement", destination: "/services/coe-enablement", permanent: true },
      { source: "/field-service-lightning", destination: "/services/field-service", permanent: true },
      ...serviceSlugs.map((slug) => ({ source: `/${slug}`, destination: `/services/${slug}`, permanent: true })),
    ]
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ]
  },
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
