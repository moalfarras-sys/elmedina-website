'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { cn } from '@/lib/utils'

const categories = [
  {
    id: 'bauturi',
    name: 'Băuturi',
    description: 'Cocktails, fresh, smoothie & cafea',
  },
  {
    id: 'pizza',
    name: 'Pizza',
    description: 'De la Margherita la fructe de mare',
  },
  {
    id: 'gratar',
    name: 'Grătar',
    description: 'Kebab, mix grill & specialități',
  },
  {
    id: 'fel-principal',
    name: 'Fel principal',
    description: 'Fajita, shaorma & mansaf',
  },
  {
    id: 'desert',
    name: 'Desert',
    description: 'Kunafeh, madlouah & clătite',
  },
  {
    id: 'gustari-calde',
    name: 'Gustări calde',
    description: 'Hummus, falafel & sambusek',
  },
] as const

export function MenuPreview() {
  return (
    <section className="section-padding bg-gradient-section">
      <ScrollReveal>
        <div className="mx-auto max-w-5xl">
          <SectionTitle
            title="Din meniul nostru"
            subtitle="Savoare orientală în fiecare preparat"
          />

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {categories.map((cat, index) => (
              <ScrollReveal key={cat.id} delay={0.06 * (index + 1)}>
                <Link
                  href={`/meniu#${cat.id}`}
                  className={cn(
                    'glass-card group relative block cursor-pointer rounded-xl border border-transparent p-6',
                    'transition hover:border-gold/30',
                  )}
                >
                  <h3 className="font-heading text-xl text-cream">{cat.name}</h3>
                  <p className="mt-1 text-sm text-beige-dark">{cat.description}</p>
                  <ArrowRight
                    className="absolute bottom-6 right-6 size-5 text-gold opacity-0 transition group-hover:opacity-100"
                    strokeWidth={2}
                    aria-hidden
                  />
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <p className="mt-8 text-center">
            <Link
              href="/meniu"
              className="inline-flex items-center gap-1 text-gold transition hover:text-gold-light"
            >
              Vezi meniul complet →
            </Link>
          </p>
        </div>
      </ScrollReveal>
    </section>
  )
}
