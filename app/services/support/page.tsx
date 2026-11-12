import type { Metadata } from "next"
import { getOffering } from "@/lib/offerings"
import { OfferingPage } from "@/components/story/offering-page"

const o = getOffering("support")

export const metadata: Metadata = {
  title: o.title,
  description: o.metaDescription,
  alternates: { canonical: o.href },
  openGraph: { title: o.title, description: o.metaDescription, images: [{ url: o.image }] },
}

export default function Page() {
  return <OfferingPage o={o} />
}
