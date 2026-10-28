import { newsletterSchema } from "@/lib/schemas"
import { handleForm } from "@/lib/forms-server"

export async function POST(req: Request) {
  return handleForm(req, "newsletter", newsletterSchema, process.env.NEWSLETTER_WEBHOOK_URL ?? process.env.FORMS_WEBHOOK_URL)
}
