'use client'

import { Quote, Star } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { OrnamentalDivider } from '@/components/ui/OrnamentalDivider'

const testimonials = [
  {
    name: 'Alexandru M.',
    text: 'Atmosferă incredibilă și preparate delicioase. Kunafeh-ul este cel mai bun din București! Recomand cu căldură.',
    rating: 5 as const,
  },
  {
    name: 'Maria D.',
    text: 'Un loc perfect pentru o seară relaxantă. Shisha excelentă, serviciu impecabil și ambient de vis.',
    rating: 5 as const,
  },
  {
    name: 'Andrei P.',
    text: 'Mix El Medina este o experiență culinară completă. Vom reveni cu siguranță! Locația este superbă.',
    rating: 5 as const,
  },
]

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} din 5 stele`}>
      {Array.from({ length: count }, (_, i) => (
        <Star
          key={i}
          className="size-4 fill-gold text-gold"
          strokeWidth={0}
          aria-hidden
        />
      ))}
    </div>
  )
}

export function TestimonialsSection() {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <SectionTitle
            title="Ce spun clienții noștri"
            subtitle="Experiențe memorabile la El Medina"
          />
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <ScrollReveal key={item.name} delay={0.1 * (index + 1)}>
              <article className="glass-card flex h-full flex-col rounded-2xl p-6 md:p-8">
                <Quote className="size-8 text-gold/30" strokeWidth={1.25} aria-hidden />
                <p className="mt-4 flex-1 text-beige italic leading-relaxed">{item.text}</p>
                <OrnamentalDivider className="my-6 max-w-full py-0" />
                <p className="font-semibold text-cream">{item.name}</p>
                <div className="mt-3">
                  <StarRow count={item.rating} />
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
