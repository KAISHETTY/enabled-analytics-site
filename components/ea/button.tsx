import * as React from "react"
import Link from "next/link"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

export const buttonStyles = cva(
  "group/btn inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-all duration-200 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-brand-600 text-white shadow-glow hover:-translate-y-0.5 hover:bg-brand-700",
        secondary: "border border-line bg-white text-ink shadow-soft hover:-translate-y-0.5 hover:border-brand-200 hover:text-brand-700",
        soft: "bg-brand-50 text-brand-700 hover:bg-brand-100",
        ghost: "text-ink hover:bg-brand-50 hover:text-brand-700",
        link: "rounded-none px-0! text-brand-600 underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-[0.9375rem]",
        lg: "h-13 px-8 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
)

type StyleProps = VariantProps<typeof buttonStyles> & { className?: string }

type AsButton = StyleProps & React.ComponentProps<"button"> & { href?: undefined }
type AsLink = StyleProps &
  Omit<React.ComponentProps<typeof Link>, "href"> & { href: string; external?: boolean }

export type ButtonProps = AsButton | AsLink

export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { variant, size, className, href, external, ...rest } = props as AsLink
    const classes = cn(buttonStyles({ variant, size }), className)
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...(rest as React.ComponentProps<"a">)} />
      )
    }
    if (/^(tel|mailto):/.test(href)) {
      return <a href={href} className={classes} {...(rest as React.ComponentProps<"a">)} />
    }
    return <Link href={href} className={classes} {...rest} />
  }
  const { variant, size, className, type = "button", ...rest } = props as AsButton
  return <button type={type} className={cn(buttonStyles({ variant, size }), className)} {...rest} />
}

/** Arrow that nudges right when its parent button/card is hovered. */
export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      className={cn("size-4 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/card:translate-x-1", className)}
    >
      <path d="M3 8h10m0 0L9 4m4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
