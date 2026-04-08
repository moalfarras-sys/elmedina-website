'use client'

import Link from 'next/link'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Badge } from '@/components/ui/Badge'

type Dish = {
  name: string
  price: string
  tag: string
}

const dishes: Dish[] = [
  { name: 'Mix El Medina', price: '110 lei', tag: 'Specialitatea casei' },
  { name: 'Mix grill', price: '75 lei', tag: 'Popular' },
  { name: 'Adana kebab', price: '57 lei', tag: 'Recomandat' },
  { name: 'Mansaf', price: '79 lei', tag: 'Autentic' },
  { name: 'Kunafeh', price: '29 lei', tag: 'Desert' },
  { name: 'El Medina Lemonade', price: '35 lei', tag: 'Răcoritoare' },
  { name: 'El Medina Smoothie', price: '31 lei', tag: 'Fresh' },
  { name: 'Cafea Arabă', price: '25 lei', tag: 'Clasic' },
]

export function RecommendedDishes() {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal className="mb-12 md:mb-16">
          <SectionTitle
            title="Preparate recomandate"
            subtitle="Cele mai apreciate din meniul nostru"
            center
          />
        </ScrollReveal>

        <div className="scrollbar-hide mx-auto flex max-w-6xl gap-6 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:overflow-visible md:pb-0">
          {dishes.map((dish, index) => (
            <ScrollReveal
              key={dish.name}
              delay={index * 0.08}
              className="min-w-[220px] shrink-0 md:min-w-0"
            >
              <article className="glass-card flex h-full min-w-[220px] flex-col overflow-hidden rounded-2xl md:min-w-0">
                <div
                  className="h-1 shrink-0 bg-linear-to-r from-gold-dark via-gold to-gold-dark"
                  aria-hidden
                />
                <div className="flex flex-1 flex-col p-5">
                  <Badge variant="gold">{dish.tag}</Badge>
                  <h3 className="font-heading mt-3 text-xl text-cream">
                    {dish.name}
                  </h3>
                  <p className="mt-2 text-lg font-semibold text-gold">
                    {dish.price}
                  </p>
                  <Link
                    href="/meniu"
                    className="mt-3 text-sm text-beige-dark transition hover:text-gold"
                  >
                    Vezi în meniu →
                  </Link>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
