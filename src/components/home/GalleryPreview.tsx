'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Camera, Flame, Music, Star, UtensilsCrossed } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { cn } from '@/lib/utils'

const placeholders: { icon: typeof Camera; key: string }[] = [
  { key: 'camera', icon: Camera },
  { key: 'utensils', icon: UtensilsCrossed },
  { key: 'flame', icon: Flame },
  { key: 'music', icon: Music },
  { key: 'star', icon: Star },
]

export function GalleryPreview() {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <SectionTitle title="Galerie" subtitle="Atmosfera El Medina" />
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          <ScrollReveal delay={0}>
            <div className="glass-card relative aspect-square overflow-hidden rounded-xl p-4">
              <Image
                src="/images/logo.png"
                alt="El Medina"
                fill
                className="object-contain p-2"
                sizes="(max-width: 768px) 50vw, 33vw"
                priority
              />
            </div>
          </ScrollReveal>

          {placeholders.map((item, index) => {
            const Icon = item.icon
            return (
              <ScrollReveal key={item.key} delay={0.08 * (index + 1)}>
                <div
                  className={cn(
                    'glass-card flex aspect-square flex-col items-center justify-center gap-2 rounded-xl',
                  )}
                >
                  <Icon className="size-12 text-gold/20" strokeWidth={1.25} aria-hidden />
                  <span className="text-sm text-beige-dark/40">În curând</span>
                </div>
              </ScrollReveal>
            )
          })}
        </div>

        <ScrollReveal delay={0.48}>
          <p className="mt-8 text-center">
            <Link
              href="/galerie"
              className="inline-flex items-center gap-1 text-gold transition hover:text-gold-light"
            >
              Vezi galeria completă →
            </Link>
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
