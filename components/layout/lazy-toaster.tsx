"use client"

import dynamic from "next/dynamic"

/** Toast host loaded after hydration; only forms raise toasts. */
export const LazyToaster = dynamic(() => import("@/components/ui/sonner").then((m) => m.Toaster), { ssr: false })
