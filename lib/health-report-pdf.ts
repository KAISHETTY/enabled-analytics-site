import type { Result } from "@/lib/health-check"

/** Builds the downloadable Org Health Report with jsPDF (loaded on demand, client-only). */
export async function downloadHealthReport({ result, name, company }: { result: Result; name: string; company: string }) {
  const { jsPDF } = await import("jspdf")
  const doc = new jsPDF({ unit: "pt", format: "a4" })
  const W = doc.internal.pageSize.getWidth()
  const blue: [number, number, number] = [1, 118, 211]
  const navy: [number, number, number] = [3, 45, 96]
  const muted: [number, number, number] = [62, 82, 114]

  // Header band (light sky)
  doc.setFillColor(234, 245, 254)
  doc.rect(0, 0, W, 150, "F")
  doc.setTextColor(...blue)
  doc.setFont("helvetica", "bold")
  doc.setFontSize(10)
  doc.text("ENABLED ANALYTICS · SALESFORCE ORG HEALTH CHECK", 48, 52)
  doc.setTextColor(...navy)
  doc.setFontSize(26)
  doc.text("Your Org Health Report", 48, 88)
  doc.setFont("helvetica", "normal")
  doc.setFontSize(11)
  doc.setTextColor(...muted)
  doc.text(`Prepared for ${name}${company ? `, ${company}` : ""} · ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`, 48, 112)

  // Score
  doc.setFillColor(...blue)
  doc.circle(W - 110, 76, 48, "F")
  doc.setTextColor(255, 255, 255)
  doc.setFont("helvetica", "bold")
  doc.setFontSize(30)
  doc.text(String(result.score), W - 110, 84, { align: "center" })
  doc.setFontSize(9)
  doc.text("/ 100", W - 110, 100, { align: "center" })

  let y = 196
  doc.setTextColor(...navy)
  doc.setFontSize(16)
  doc.text(`Overall: ${result.band.label}`, 48, y)
  y += 20
  doc.setFont("helvetica", "normal")
  doc.setFontSize(11)
  doc.setTextColor(...muted)
  doc.text(doc.splitTextToSize(result.band.summary, W - 96), 48, y)
  y += 48

  doc.setFont("helvetica", "bold")
  doc.setTextColor(...navy)
  doc.setFontSize(13)
  doc.text("Scores by area (lowest first)", 48, y)
  y += 22
  for (const d of result.byDimension) {
    doc.setFont("helvetica", "normal")
    doc.setFontSize(11)
    doc.setTextColor(...navy)
    doc.text(d.label, 48, y)
    doc.text(String(d.score), W - 48, y, { align: "right" })
    y += 8
    doc.setFillColor(238, 246, 255)
    doc.roundedRect(48, y, W - 96, 8, 4, 4, "F")
    doc.setFillColor(...blue)
    doc.roundedRect(48, y, Math.max(8, ((W - 96) * d.score) / 100), 8, 4, 4, "F")
    y += 18
    doc.setFontSize(9.5)
    doc.setTextColor(...muted)
    doc.text(`Recommended: ${d.service.title}`, 48, y)
    y += 24
  }

  y += 6
  doc.setFont("helvetica", "bold")
  doc.setFontSize(13)
  doc.setTextColor(...navy)
  doc.text("Next steps", 48, y)
  y += 18
  doc.setFont("helvetica", "normal")
  doc.setFontSize(11)
  doc.setTextColor(...muted)
  const steps = [
    `1. Start with your lowest area: ${result.byDimension[0].label}.`,
    "2. Book a full Org Assessment: our experts review your implementation, technical debt and deployed technologies.",
    "3. Ask us about Agentforce readiness once your data foundations are in place.",
  ]
  for (const s of steps) {
    const lines = doc.splitTextToSize(s, W - 96)
    doc.text(lines, 48, y)
    y += lines.length * 15 + 4
  }

  doc.setDrawColor(221, 231, 243)
  doc.line(48, 780, W - 48, 780)
  doc.setFontSize(9)
  doc.text("This self-assessment is an indicator, not an audit. info@enabledanalytics.com · 214 402 3125 · enabledanalytics.com", 48, 798)

  doc.save(`Org-Health-Report-${result.score}.pdf`)
}
