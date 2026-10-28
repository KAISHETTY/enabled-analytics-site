import { healthCheckSchema } from "@/lib/schemas"
import { handleForm } from "@/lib/forms-server"

export async function POST(req: Request) {
  return handleForm(req, "org-health-check", healthCheckSchema)
}
