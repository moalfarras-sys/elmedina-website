'use client'

import Link from 'next/link'
import { Flame } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { OrnamentalDivider } from '@/components/ui/OrnamentalDivider'
import { cn } from '@/lib/utils'

export function ShishaSection() {
  return (
    <section
      className={cn(
        'section-padding relative overflow-hidden bg-dark',
        'bg-[radial-gradient(ellipse_90%_55%_at_50%_-15%,rgba(201,168,76,0.14),transparent_55%),radial-gradient(ellipse_70%_45%_at_100%_40%,rgba(139,90,43,0.1),transparent_50%),radial-gradient(ellipse_60%_50%_at_0%_60%,rgba(201,168,76,0.06),transparent_45%)]',
      )}
    >
      <div
        className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-gold/5 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-bronze/5 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-112 w-112 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 opacity-50 blur-[100px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <ScrollReveal delay={0}>
          <div className="mb-6 flex justify-center">
            <span className="inline-flex rounded-full border border-gold/20 bg-gold/10 p-3 text-gold glow-gold-sm">
              <Flame className="size-6" strokeWidth={1.75} aria-hidden />
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <h2 className="font-heading text-3xl text-gradient-gold md:text-5xl">
            Shisha & Atmosferă
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.16}>
          <div className="mx-auto mt-4 flex justify-center">
            <OrnamentalDivider className="max-w-md" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.24}>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-beige-dark md:text-xl">
            O experiență relaxantă, arome atent alese și un ambient oriental modern
            pentru seri memorabile alături de prieteni.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.32}>
          <p className="mx-auto mt-4 max-w-2xl text-beige-dark/70">
            Alege dintr-o selecție premium de arome și bucură-te de momentele speciale
            în atmosfera caldă și rafinată a El Medina.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="mt-8">
            <Link
              href="/rezervari"
              className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-3 font-semibold text-dark transition hover:brightness-110"
            >
              Rezervă o seară specială
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
