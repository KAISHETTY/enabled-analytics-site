import * as React from "react"
import type { LucideProps } from "lucide-react"
import { getIcon } from "@/lib/icons"

/** Renders a lucide icon by the string name used in site-content.json. */
export function DynamicIcon({ name, ...props }: LucideProps & { name: string }) {
  return React.createElement(getIcon(name), { "aria-hidden": true, ...props })
}
