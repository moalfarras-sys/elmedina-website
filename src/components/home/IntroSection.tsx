'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { SectionTitle } from '@/components/ui/SectionTitle'

export function IntroSection() {
  return (
    <section className="section-padding relative">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal className="mb-12 md:mb-16">
          <SectionTitle
            title="Povestea noastră"
            subtitle="Un spațiu creat pentru experiențe memorabile"
            center
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <ScrollReveal direction="right" delay={0.05}>
            <div className="flex justify-center lg:justify-start">
              <div className="rounded-2xl bg-dark-card p-6 glow-gold">
                <Image
                  src="/images/logo.png"
                  alt="El Medina"
                  width={256}
                  height={256}
                  className="mx-auto h-64 w-64 object-contain"
                />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={0.12}>
            <div className="space-y-6 text-beige-dark md:space-y-7">
              <p className="text-base leading-relaxed md:text-lg">
                El Medina este un spațiu unde aromele orientale, atmosfera
                relaxantă și ospitalitatea autentică se întâlnesc într-o
                experiență memorabilă.
              </p>
              <p className="text-base leading-relaxed md:text-lg">
                Fie că vii pentru cină, desert, băuturi sau shisha, El Medina
                oferă un ambient elegant și primitor pentru seri speciale în
                București.
              </p>
              <Link
                href="/despre-noi"
                className="group inline-flex items-center gap-2 pt-2 text-gold transition hover:text-gold-light"
              >
                <span className="font-medium">Află mai multe</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
