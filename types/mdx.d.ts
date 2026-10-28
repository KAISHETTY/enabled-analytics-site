declare module "*.mdx" {
  import type { ComponentType } from "react"
  import type { PostMeta } from "@/lib/blog"

  export const meta: PostMeta
  const MDXComponent: ComponentType
  export default MDXComponent
}
