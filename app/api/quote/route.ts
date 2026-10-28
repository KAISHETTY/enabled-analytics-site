import { quoteSchema } from "@/lib/schemas"
import { handleForm } from "@/lib/forms-server"

export async function POST(req: Request) {
  return handleForm(req, "quote", quoteSchema)
}
