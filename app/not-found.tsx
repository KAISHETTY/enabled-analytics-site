import Link from "next/link"
import { services } from "@/lib/content"
import { HeroBackdrop } from "@/components/ea/hero"
import { ArrowIcon, Button } from "@/components/ea/button"

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-gradient-to-b from-brand-50/70 to-white pt-32 pb-20">
      <HeroBackdrop />
      <div className="container-page relative mx-auto max-w-2xl text-center">
        <p className="font-heading text-[7rem] leading-none font-extrabold text-brand-100 md:text-[10rem]" aria-hidden="true">
          404
        </p>
        <h1 className="-mt-6 text-4xl font-extrabold md:text-5xl">Page not found</h1>
        <p className="mx-auto mt-5 max-w-lg text-lg">The page you’re looking for doesn’t exist or has moved. Try one of these instead.</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button href="/" size="lg">
            Back to home <ArrowIcon />
          </Button>
          <Button href="/contact" size="lg" variant="secondary">
            Contact us
          </Button>
        </div>
        <ul className="mt-12 flex flex-wrap justify-center gap-2">
          {services.slice(0, 6).map((s) => (
            <li key={s.slug}>
              <Link href={`/services/${s.slug}`} className="inline-flex rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink shadow-soft hover:border-brand-300 hover:text-brand-700">
                {s.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
