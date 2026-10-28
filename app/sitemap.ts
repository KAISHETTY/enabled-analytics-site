import type { MetadataRoute } from "next"
import { services } from "@/lib/content"
import { caseStudies } from "@/lib/case-studies"
import { postSummaries } from "@/lib/blog"
import { siteUrl } from "@/lib/site-config"

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: [string, number, MetadataRoute.Sitemap[number]["changeFrequency"]][] = [
    ["/", 1, "weekly"],
    ["/services", 0.9, "monthly"],
    ["/products", 0.8, "monthly"],
    ["/about", 0.7, "monthly"],
    ["/team", 0.6, "monthly"],
    ["/industries", 0.6, "monthly"],
    ["/agentforce", 0.95, "monthly"],
    ["/health-check", 0.9, "monthly"],
    ["/case-studies", 0.8, "monthly"],
    ["/blog", 0.7, "weekly"],
    ["/testimonials", 0.6, "monthly"],
    ["/faq", 0.5, "monthly"],
    ["/careers", 0.6, "weekly"],
    ["/contact", 0.8, "yearly"],
    ["/get-a-quote", 0.8, "yearly"],
    ["/privacy", 0.2, "yearly"],
    ["/terms", 0.2, "yearly"],
  ]
  return [
    ...pages.map(([path, priority, changeFrequency]) => ({ url: `${siteUrl}${path}`, priority, changeFrequency })),
    ...services.map((s) => ({ url: `${siteUrl}/services/${s.slug}`, priority: 0.8, changeFrequency: "monthly" as const })),
    ...caseStudies.map((c) => ({ url: `${siteUrl}/case-studies/${c.slug}`, priority: 0.7, changeFrequency: "yearly" as const })),
    ...postSummaries.map((p) => ({ url: `${siteUrl}/blog/${p.slug}`, lastModified: p.date, priority: 0.6, changeFrequency: "yearly" as const })),
  ]
}
