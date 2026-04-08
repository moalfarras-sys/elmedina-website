'use client'

import Link from 'next/link'
import {
  UtensilsCrossed,
  Cake,
  Wine,
  Flame,
  CalendarCheck,
  Camera,
  type LucideIcon,
} from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { SectionTitle } from '@/components/ui/SectionTitle'

type CategoryItem = {
  icon: LucideIcon
  title: string
  href: string
}

const categories: CategoryItem[] = [
  { icon: UtensilsCrossed, title: 'Meniu principal', href: '/meniu' },
  { icon: Cake, title: 'Deserturi', href: '/meniu#desert' },
  { icon: Wine, title: 'Băuturi', href: '/meniu#bauturi-racoritoare' },
  { icon: Flame, title: 'Shisha', href: '#shisha' },
  { icon: CalendarCheck, title: 'Rezervări', href: '/rezervari' },
  { icon: Camera, title: 'Galerie', href: '/galerie' },
]

export function FeaturedCategories() {
  return (
    <section className="section-padding bg-gradient-section">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal className="mb-12 md:mb-16">
          <SectionTitle
            title="Descoperă El Medina"
            subtitle="Explorează experiența completă"
            center
          />
        </ScrollReveal>

        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {categories.map((cat, index) => {
            const Icon = cat.icon
            return (
              <ScrollReveal key={cat.href + cat.title} delay={index * 0.1}>
                <Link
                  href={cat.href}
                  className="group glass-card flex h-full flex-col items-center rounded-2xl p-6 text-center transition hover:border-gold/30 hover:glow-gold-sm md:p-8"
                >
                  <Icon
                    className="h-8 w-8 text-gold"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <span className="mt-4 font-medium text-cream">{cat.title}</span>
                </Link>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
