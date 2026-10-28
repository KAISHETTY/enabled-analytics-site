/**
 * Salesforce Org Health Check self-assessment. Questions are written for this
 * tool and map to Enabled Analytics services (Org Assessment, Discover Cloud,
 * CoE, Data Analytics, Agentforce). Scores are a self-reported indicator, not an
 * audit; the follow-up expert review is the real assessment.
 */
export type Dimension = "data" | "automation" | "performance" | "adoption" | "governance" | "ai"

export const dimensions: Record<Dimension, { label: string; service: { title: string; href: string } }> = {
  data: { label: "Data quality", service: { title: "Data Analytics & Data Cloud", href: "/services/data-analytics" } },
  automation: { label: "Automation & technical debt", service: { title: "Org Assessment", href: "/services/org-assessment" } },
  performance: { label: "Performance & code quality", service: { title: "Discover Cloud scorecards", href: "/products" } },
  adoption: { label: "User adoption", service: { title: "CoE Enablement", href: "/services/coe-enablement" } },
  governance: { label: "Security & governance", service: { title: "CoE Teams", href: "/services/coe-teams" } },
  ai: { label: "AI & Agentforce readiness", service: { title: "Agentforce Implementation", href: "/agentforce" } },
}

export type Question = { id: string; dimension: Dimension; text: string; options: { label: string; score: 0 | 1 | 2 | 3 }[] }

const scale = (a: string, b: string, c: string, d: string) => [
  { label: a, score: 0 as const },
  { label: b, score: 1 as const },
  { label: c, score: 2 as const },
  { label: d, score: 3 as const },
]

export const questions: Question[] = [
  { id: "q1", dimension: "data", text: "How complete and duplicate-free are your key records (accounts, contacts, opportunities)?", options: scale("Lots of gaps & duplicates", "Patchy", "Mostly clean", "Clean & governed") },
  { id: "q2", dimension: "data", text: "Is customer data from your other systems connected to Salesforce?", options: scale("Not at all", "A few manual imports", "Some integrations", "Harmonized, near real time") },
  { id: "q3", dimension: "automation", text: "How would you describe your automation (Flows, legacy Process Builder/Workflow, triggers)?", options: scale("Tangled & undocumented", "Mixed old and new", "Mostly modern Flows", "Consolidated & documented") },
  { id: "q4", dimension: "automation", text: "How many unused fields, reports or undocumented changes have built up?", options: scale("A lot, nobody knows", "Quite a few", "Some, we clean up", "Regularly reviewed") },
  { id: "q5", dimension: "performance", text: "Do users complain about slow page loads or timeouts?", options: scale("Daily", "Often", "Occasionally", "Rarely or never") },
  { id: "q6", dimension: "performance", text: "Do you benchmark code and release quality before deploying?", options: scale("No", "Ad hoc", "For big releases", "Every release, automated") },
  { id: "q7", dimension: "adoption", text: "How much of your team’s work actually happens in Salesforce?", options: scale("Spreadsheets rule", "Some", "Most", "Nearly all") },
  { id: "q8", dimension: "adoption", text: "Do teams get ongoing training when features change?", options: scale("Never", "At go-live only", "Sometimes", "Continuously") },
  { id: "q9", dimension: "governance", text: "How tightly are permissions managed (profiles, permission sets, sharing)?", options: scale("Everyone sees everything", "Loosely", "Reasonably", "Least-privilege, reviewed") },
  { id: "q10", dimension: "governance", text: "Is there a release process (sandboxes, testing, change approval)?", options: scale("Changes go straight to prod", "Informal", "Defined", "Automated CI/CD") },
  { id: "q11", dimension: "ai", text: "Have you identified processes where AI agents could take on work?", options: scale("Not yet", "Ideas only", "A shortlist", "Prioritized use cases") },
  { id: "q12", dimension: "ai", text: "Is your knowledge content (articles, FAQs, policies) current and in Salesforce?", options: scale("No", "Scattered", "Partly", "Yes, maintained") },
]

export type Result = {
  score: number
  band: { label: string; tone: "critical" | "fair" | "good" | "great"; summary: string }
  byDimension: { key: Dimension; label: string; score: number; service: { title: string; href: string } }[]
}

export function scoreAnswers(answers: Record<string, number>): Result {
  const keys = Object.keys(dimensions) as Dimension[]
  const byDimension = keys.map((key) => {
    const qs = questions.filter((q) => q.dimension === key)
    const total = qs.reduce((s, q) => s + (answers[q.id] ?? 0), 0)
    return { key, label: dimensions[key].label, score: Math.round((total / (qs.length * 3)) * 100), service: dimensions[key].service }
  })
  const all = questions.reduce((s, q) => s + (answers[q.id] ?? 0), 0)
  const score = Math.round((all / (questions.length * 3)) * 100)
  const band =
    score < 40
      ? { label: "Needs attention", tone: "critical" as const, summary: "Technical debt and data gaps are likely slowing your teams down. A full Org Assessment is the fastest way back on track." }
      : score < 60
        ? { label: "Fair", tone: "fair" as const, summary: "The foundations are there, but a few areas are holding back performance and adoption." }
        : score < 80
          ? { label: "Healthy", tone: "good" as const, summary: "Your org is in good shape. Targeted optimization will unlock more value, and prepare you for Agentforce." }
          : { label: "Excellent", tone: "great" as const, summary: "A well-run org. You’re ready to scale and to put AI agents to work." }
  return { score, band, byDimension: byDimension.sort((a, b) => a.score - b.score) }
}
