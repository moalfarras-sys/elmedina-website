import type { Metadata } from 'next'
import { MessageCircle, Phone } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { OrnamentalDivider } from '@/components/ui/OrnamentalDivider'
import { ReservationForm } from '@/components/reservation/ReservationForm'
import { businessInfo } from '@/data/business'

export const metadata: Metadata = {
  title: 'Rezervări',
  description:
    'Rezervă o masă la El Medina — Shisha Café & Restaurant în București. Completează formularul sau contactează-ne telefonic și pe WhatsApp.',
}

function telHref(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (!digits) return '#'
  return digits.startsWith('0') ? `tel:+40${digits.slice(1)}` : `tel:+${digits}`
}

export default function RezervariPage() {
  const waUrl = `https://wa.me/${businessInfo.whatsapp.replace(/\D/g, '')}`
  const hasEmbed =
    typeof businessInfo.mapEmbed === 'string' &&
    businessInfo.mapEmbed.trim().length > 0 &&
    businessInfo.mapEmbed.startsWith('http')

  return (
    <>
      <section className="relative flex h-64 items-center justify-center overflow-hidden bg-linear-to-b from-dark via-dark-surface to-dark">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 30% 20%, var(--color-gold) 0%, transparent 45%), radial-gradient(circle at 70% 80%, var(--color-bronze) 0%, transparent 40%)',
          }}
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <OrnamentalDivider className="mx-auto max-w-xs" />
          <h1 className="font-heading mt-4 text-4xl tracking-tight text-gradient-gold md:text-5xl">
            Rezervări
          </h1>
          <p className="mt-3 text-lg text-beige-dark md:text-xl">
            Rezervă o masă la El Medina
          </p>
        </div>
      </section>

      <ScrollReveal>
        <section className="section-padding bg-gradient-section">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <ReservationForm />
              </div>

              <aside className="flex flex-col gap-6 lg:col-span-2">
                <div className="glass-card rounded-2xl p-6">
                  <h2 className="font-heading text-xl text-gradient-gold">
                    Rezervare rapidă
                  </h2>
                  <div className="mt-5 space-y-4">
                    <a
                      href={telHref(businessInfo.phone)}
                      className="flex items-center gap-3 rounded-xl border border-dark-border bg-dark-surface/50 p-4 text-cream transition hover:border-gold/40 hover:bg-dark-hover"
                    >
                      <span className="inline-flex text-gold">
                        <Phone className="size-5" strokeWidth={1.75} aria-hidden />
                      </span>
                      <span className="font-medium">{businessInfo.phone}</span>
                    </a>
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-xl border border-dark-border bg-dark-surface/50 p-4 text-cream transition hover:border-gold/40 hover:bg-dark-hover"
                    >
                      <span className="inline-flex text-gold">
                        <MessageCircle
                          className="size-5"
                          strokeWidth={1.75}
                          aria-hidden
                        />
                      </span>
                      <span className="font-medium">
                        Trimite mesaj pe WhatsApp
                      </span>
                    </a>
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-6">
                  <h2 className="font-heading text-xl text-gradient-gold">
                    Program
                  </h2>
                  <ul className="mt-4 space-y-2 text-sm text-beige-dark">
                    {businessInfo.openingHours.map((row) => (
                      <li
                        key={row.day}
                        className="flex justify-between gap-4 border-b border-dark-border/60 py-2 last:border-0"
                      >
                        <span className="text-beige">{row.day}</span>
                        <span className="shrink-0 text-cream/90">{row.hours}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="glass-card overflow-hidden rounded-2xl p-6">
                  <h2 className="font-heading text-xl text-gradient-gold">
                    Locație
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-beige-dark">
                    {businessInfo.address}
                  </p>
                  {hasEmbed ? (
                    <div className="mt-4 overflow-hidden rounded-xl border border-dark-border">
                      <iframe
                        title="Hartă El Medina"
                        src={businessInfo.mapEmbed}
                        className="aspect-video w-full border-0"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                      />
                    </div>
                  ) : null}
                </div>
              </aside>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  )
}
