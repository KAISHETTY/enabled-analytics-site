import { z } from "zod"

const name = z.string().trim().min(2, "Please enter your name").max(100)
const email = z.email("Please enter a valid email address").max(200)
const phone = z
  .string()
  .trim()
  .max(30)
  .regex(/^[+()\d\s.-]*$/, "Please enter a valid phone number")
  .optional()
  .or(z.literal(""))
/** Hidden honeypot field: humans leave it empty. */
const honeypot = z.string().max(0).optional()

/** Service-interest choices for the single inquiry form (2026-10-30 feedback). */
export const serviceInterests = [
  "Implementation",
  "Enhancements / Modernization",
  "Integration / Data Migration",
  "AI / Agentforce / Data 360",
  "Support / Optimization",
  "Staff Augmentation",
  "Public Sector",
  "Other",
] as const

/** The two homepage lead paths; both open the same inquiry form. */
export const journeys = ["Starting fresh", "Established org"] as const
export type Journey = (typeof journeys)[number]

export const contactSchema = z.object({
  name,
  email,
  company: z.string().trim().min(2, "Please enter your company").max(120),
  services: z.array(z.enum(serviceInterests)).min(1, "Choose at least one service"),
  message: z.string().trim().min(10, "Please tell us a little more (10+ characters)").max(5000),
  journey: z.enum(journeys).optional(),
  consent: z.literal(true, { error: "Please accept the privacy policy" }),
  website: honeypot,
})
export type ContactInput = z.infer<typeof contactSchema>

export const quoteSchema = z.object({
  services: z.array(z.string()).min(1, "Pick at least one service"),
  orgStatus: z.enum(["new", "existing", "unsure"], { error: "Choose one option" }),
  engagement: z.enum(["fixed-price", "time-material", "hire-experts", "unsure"], { error: "Choose one option" }),
  timeline: z.enum(["asap", "1-3-months", "3-6-months", "exploring"], { error: "Choose one option" }),
  details: z.string().trim().max(5000).optional(),
  name,
  email,
  phone,
  company: z.string().trim().min(2, "Please enter your company").max(120),
  consent: z.literal(true, { error: "Please accept the privacy policy" }),
  website: honeypot,
})
export type QuoteInput = z.infer<typeof quoteSchema>

export const healthCheckSchema = z.object({
  name,
  email,
  company: z.string().trim().min(2, "Please enter your company").max(120),
  wantsReview: z.boolean().optional(),
  consent: z.literal(true, { error: "Please accept the privacy policy" }),
  score: z.number().int().min(0).max(100),
  answers: z.record(z.string(), z.number().int().min(0).max(3)),
  website: honeypot,
})
export type HealthCheckInput = z.infer<typeof healthCheckSchema>

export const newsletterSchema = z.object({ email, website: honeypot })
export type NewsletterInput = z.infer<typeof newsletterSchema>

export const applySchema = z.object({
  name,
  email,
  phone,
  position: z.string().min(1, "Choose a position"),
  linkedin: z.url("Please enter a valid URL").optional().or(z.literal("")),
  message: z.string().trim().max(3000).optional(),
  resumeName: z.string().max(200).optional(),
  consent: z.literal(true, { error: "Please accept the privacy policy" }),
  website: honeypot,
})
export type ApplyInput = z.infer<typeof applySchema>
