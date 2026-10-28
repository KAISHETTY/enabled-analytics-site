"use client"

import * as React from "react"
import Image from "next/image"
import { Dialog as D } from "radix-ui"
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react"
import { cn } from "@/lib/utils"

export type GalleryImage = { src: string; alt: string; width: number; height: number }

/** Thumbnail grid that opens an accessible lightbox (Esc to close, ←/→ to navigate). */
export function Gallery({ images, className }: { images: GalleryImage[]; className?: string }) {
  const [index, setIndex] = React.useState<number | null>(null)
  const open = index !== null
  const go = React.useCallback((delta: number) => setIndex((i) => (i === null ? i : (i + delta + images.length) % images.length)), [images.length])

  const current = index !== null ? images[index] : null

  return (
    <>
      <ul className={cn("grid grid-cols-2 gap-4 md:grid-cols-3", className)}>
        {images.map((img, i) => (
          <li key={img.src} className={cn(i === 0 && "col-span-2 row-span-2 md:col-span-1")}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group/g relative block h-full w-full overflow-hidden rounded-xl bg-surface ring-1 ring-line focus-visible:outline-offset-4"
              aria-label={`Open image: ${img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                sizes="(min-width: 768px) 33vw, 50vw"
                className="h-full w-full object-cover transition-transform duration-500 group-hover/g:scale-105"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-brand-700/0 transition-colors group-hover/g:bg-brand-700/20">
                <ZoomIn aria-hidden="true" className="size-8 text-white opacity-0 drop-shadow transition-opacity group-hover/g:opacity-100" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <D.Root open={open} onOpenChange={(o) => !o && setIndex(null)}>
        <D.Portal>
          <D.Overlay className="fixed inset-0 z-50 bg-white/90 backdrop-blur-md data-[state=open]:animate-in data-[state=open]:fade-in" />
          <D.Content
            className="fixed inset-0 z-50 flex items-center justify-center p-4 outline-none md:p-12"
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") go(1)
              if (e.key === "ArrowLeft") go(-1)
            }}
          >
            <D.Title className="sr-only">{current?.alt ?? "Image"}</D.Title>
            <D.Description className="sr-only">
              Image {index !== null ? index + 1 : 0} of {images.length}. Use the arrow keys to navigate.
            </D.Description>
            {current && (
              <figure className="flex max-h-full max-w-5xl flex-col items-center gap-4">
                <Image
                  src={current.src}
                  alt={current.alt}
                  width={current.width}
                  height={current.height}
                  sizes="90vw"
                  className="max-h-[75vh] w-auto rounded-xl object-contain shadow-lift ring-1 ring-line"
                />
                <figcaption className="text-sm text-ink-muted">
                  {current.alt} · {index! + 1}/{images.length}
                </figcaption>
              </figure>
            )}
            <button type="button" onClick={() => go(-1)} aria-label="Previous image" className="absolute left-3 flex size-12 items-center justify-center rounded-full border border-line bg-white text-ink shadow-soft hover:text-brand-700 md:left-8">
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next image" className="absolute right-3 flex size-12 items-center justify-center rounded-full border border-line bg-white text-ink shadow-soft hover:text-brand-700 md:right-8">
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
            <D.Close aria-label="Close" className="absolute top-4 right-4 flex size-11 items-center justify-center rounded-full bg-brand-600 text-white shadow-glow hover:bg-brand-700">
              <X className="size-5" aria-hidden="true" />
            </D.Close>
          </D.Content>
        </D.Portal>
      </D.Root>
    </>
  )
}
