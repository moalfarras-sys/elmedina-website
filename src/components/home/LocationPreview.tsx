'use client'

import Link from 'next/link'
import { Clock, MapPin, Phone } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { businessInfo } from '@/data/business'
import { cn } from '@/lib/utils'

function telHref(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (!digits) return '#'
  return digits.startsWith('0') ? `tel:+40${digits.slice(1)}` : `tel:+${digits}`
}

export function LocationPreview() {
  const hasEmbed =
    typeof businessInfo.mapEmbed === 'string' &&
    businessInfo.mapEmbed.trim().length > 0 &&
    businessInfo.mapEmbed.startsWith('http')

  return (
    <section className="section-padding bg-gradient-section">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <SectionTitle title="Unde ne găsești" subtitle="Te așteptăm cu drag" />
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <ScrollReveal delay={0.06}>
              <a
                href={businessInfo.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card block rounded-xl p-6 transition hover:bg-dark-hover"
              >
                <div className="flex gap-4">
                  <span className="inline-flex shrink-0 text-gold">
                    <MapPin className="size-6" strokeWidth={1.75} aria-hidden />
                  </span>
                  <div>
                    <p className="font-semibold text-cream">Adresă</p>
                    <p className="mt-1 text-beige-dark">{businessInfo.address}</p>
                    <p className="mt-2 text-sm text-gold">Deschide în Google Maps →</p>
                  </div>
                </div>
              </a>
            </ScrollReveal>

            <ScrollReveal delay={0.12}>
              <a
                href={telHref(businessInfo.phone)}
                className="glass-card block rounded-xl p-6 transition hover:bg-dark-hover"
              >
                <div className="flex gap-4">
                  <span className="inline-flex shrink-0 text-gold">
                    <Phone className="size-6" strokeWidth={1.75} aria-hidden />
                  </span>
                  <div>
                    <p className="font-semibold text-cream">{businessInfo.phone}</p>
                    <p className="mt-1 text-sm text-beige-dark">Sună pentru rezervări</p>
                  </div>
                </div>
              </a>
            </ScrollReveal>

            <ScrollReveal delay={0.18}>
              <div className="glass-card rounded-xl p-6">
                <div className="flex gap-4">
                  <span className="inline-flex shrink-0 text-gold">
                    <Clock className="size-6" strokeWidth={1.75} aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-cream">Program</p>
                    <ul className="mt-3 space-y-2 text-sm text-beige-dark">
                      {businessInfo.openingHours.map((row) => (
                        <li key={row.day} className="flex justify-between gap-4">
                          <span className="text-beige-dark/90">{row.day}</span>
                          <span className="shrink-0 text-cream/90">{row.hours}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.1}>
            <div className="glass-card aspect-video overflow-hidden rounded-xl">
              {hasEmbed ? (
                <iframe
                  title="Hartă El Medina"
                  src={businessInfo.mapEmbed}
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-4 bg-dark-surface p-6 text-center">
                  <MapPin className="size-10 text-gold/40" aria-hidden />
                  <p className="text-beige-dark">Harta nu este disponibilă momentan.</p>
                  <Link
                    href={businessInfo.googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-dark transition hover:brightness-110"
                  >
                    Deschide în Google Maps
                  </Link>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.24}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/rezervari"
              className="inline-flex items-center justify-center rounded-full bg-gold px-6 py-3 font-semibold text-dark transition hover:brightness-110"
            >
              Rezervă o masă
            </Link>
            <Link
              href="/contact"
              className={cn(
                'inline-flex items-center justify-center rounded-full border border-gold px-6 py-3',
                'font-semibold text-gold transition hover:border-gold-light hover:text-gold-light',
              )}
            >
              Contactează-ne
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
