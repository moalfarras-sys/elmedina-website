'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Clock,
  Instagram,
  Loader2,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { OrnamentalDivider } from '@/components/ui/OrnamentalDivider'
import { businessInfo } from '@/data/business'
import { cn } from '@/lib/utils'

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error'

type FieldErrors = Partial<
  Record<'name' | 'email' | 'phone' | 'subject' | 'message', string>
>

const inputClass =
  'w-full rounded-xl border border-dark-border bg-dark-surface px-4 py-3 text-cream outline-none transition focus:border-gold focus:ring-1 focus:ring-gold/30'

const labelClass = 'mb-2 block text-sm font-medium text-beige-dark'

function telHref(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (!digits) return '#'
  return digits.startsWith('0') ? `tel:+40${digits.slice(1)}` : `tel:+${digits}`
}

const initialForm = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
}

export default function ContactPage() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [apiMessage, setApiMessage] = useState<string | null>(null)

  const waUrl = `https://wa.me/${businessInfo.whatsapp.replace(/\D/g, '')}`
  const hasEmbed =
    typeof businessInfo.mapEmbed === 'string' &&
    businessInfo.mapEmbed.trim().length > 0 &&
    businessInfo.mapEmbed.startsWith('http')

  function validate(): boolean {
    const next: FieldErrors = {}
    if (!form.name.trim()) next.name = 'Introduceți numele.'
    if (!form.email.trim()) next.email = 'Introduceți adresa de email.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = 'Introduceți o adresă de email validă.'
    if (form.phone.trim()) {
      const d = form.phone.replace(/\D/g, '')
      if (d.length < 9) next.phone = 'Introduceți un număr de telefon valid.'
    }
    if (!form.subject.trim()) next.subject = 'Introduceți subiectul.'
    if (!form.message.trim()) next.message = 'Introduceți mesajul.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setApiMessage(null)
    if (!validate()) return

    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || undefined,
          subject: form.subject.trim(),
          message: form.message.trim(),
        }),
      })
      const data = (await res.json()) as { success?: boolean; message?: string }

      if (!res.ok || !data.success) {
        setStatus('error')
        setApiMessage(
          data.message ??
            'Nu am putut trimite mesajul. Încercați din nou mai târziu.',
        )
        return
      }

      setStatus('success')
      setForm(initialForm)
      setErrors({})
      setApiMessage(
        data.message ?? 'Mesajul a fost trimis cu succes. Vă mulțumim!',
      )
    } catch {
      setStatus('error')
      setApiMessage(
        'Eroare de rețea. Verificați conexiunea și încercați din nou.',
      )
    }
  }

  function handleResetForm() {
    setStatus('idle')
    setApiMessage(null)
    setErrors({})
  }

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
            Contact
          </h1>
          <p className="mt-3 text-lg text-beige-dark md:text-xl">
            Suntem aici pentru tine
          </p>
        </div>
      </section>

      <ScrollReveal>
        <section className="section-padding bg-gradient-section">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              <div>
                {status === 'success' ? (
                  <div className="glass-card rounded-2xl p-8">
                    <p className="text-center text-lg text-cream">
                      {apiMessage}
                    </p>
                    <div className="mt-6 flex justify-center">
                      <button
                        type="button"
                        onClick={handleResetForm}
                        className="rounded-full border border-gold/40 px-6 py-2.5 text-sm font-semibold text-gold transition hover:bg-gold/10"
                      >
                        Trimite alt mesaj
                      </button>
                    </div>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="glass-card rounded-2xl p-6 md:p-8"
                    noValidate
                  >
                    {status === 'error' && apiMessage ? (
                      <p
                        className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
                        role="alert"
                      >
                        {apiMessage}
                      </p>
                    ) : null}

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <label htmlFor="ct-name" className={labelClass}>
                          Nume <span className="text-red-400">*</span>
                        </label>
                        <input
                          id="ct-name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          value={form.name}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, name: e.target.value }))
                          }
                          className={inputClass}
                          disabled={status === 'sending'}
                        />
                        {errors.name ? (
                          <p className="mt-1.5 text-sm text-red-400">
                            {errors.name}
                          </p>
                        ) : null}
                      </div>

                      <div>
                        <label htmlFor="ct-email" className={labelClass}>
                          Email <span className="text-red-400">*</span>
                        </label>
                        <input
                          id="ct-email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={form.email}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, email: e.target.value }))
                          }
                          className={inputClass}
                          disabled={status === 'sending'}
                        />
                        {errors.email ? (
                          <p className="mt-1.5 text-sm text-red-400">
                            {errors.email}
                          </p>
                        ) : null}
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="ct-phone" className={labelClass}>
                          Telefon
                        </label>
                        <input
                          id="ct-phone"
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          value={form.phone}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, phone: e.target.value }))
                          }
                          className={inputClass}
                          disabled={status === 'sending'}
                        />
                        {errors.phone ? (
                          <p className="mt-1.5 text-sm text-red-400">
                            {errors.phone}
                          </p>
                        ) : null}
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="ct-subject" className={labelClass}>
                          Subiect <span className="text-red-400">*</span>
                        </label>
                        <input
                          id="ct-subject"
                          name="subject"
                          type="text"
                          value={form.subject}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, subject: e.target.value }))
                          }
                          className={inputClass}
                          disabled={status === 'sending'}
                        />
                        {errors.subject ? (
                          <p className="mt-1.5 text-sm text-red-400">
                            {errors.subject}
                          </p>
                        ) : null}
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="ct-message" className={labelClass}>
                          Mesaj <span className="text-red-400">*</span>
                        </label>
                        <textarea
                          id="ct-message"
                          name="message"
                          rows={5}
                          value={form.message}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, message: e.target.value }))
                          }
                          className={cn(inputClass, 'min-h-[140px] resize-y')}
                          disabled={status === 'sending'}
                        />
                        {errors.message ? (
                          <p className="mt-1.5 text-sm text-red-400">
                            {errors.message}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div className="mt-8">
                      <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-3 font-semibold text-dark transition hover:bg-gold-light disabled:pointer-events-none disabled:opacity-60"
                      >
                        {status === 'sending' ? (
                          <>
                            <Loader2 className="size-5 animate-spin" aria-hidden />
                            Se trimite…
                          </>
                        ) : (
                          'Trimite mesajul'
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>

              <div className="flex flex-col gap-4">
                <a
                  href={businessInfo.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card block rounded-2xl p-6 transition hover:bg-dark-hover"
                >
                  <div className="flex gap-4">
                    <span className="inline-flex shrink-0 text-gold">
                      <MapPin className="size-6" strokeWidth={1.75} aria-hidden />
                    </span>
                    <div>
                      <p className="font-heading text-lg text-cream">Adresă</p>
                      <p className="mt-2 text-sm leading-relaxed text-beige-dark">
                        {businessInfo.address}
                      </p>
                      <p className="mt-2 text-sm text-gold">
                        Deschide în Google Maps →
                      </p>
                    </div>
                  </div>
                </a>

                <a
                  href={telHref(businessInfo.phone)}
                  className="glass-card block rounded-2xl p-6 transition hover:bg-dark-hover"
                >
                  <div className="flex gap-4">
                    <span className="inline-flex shrink-0 text-gold">
                      <Phone className="size-6" strokeWidth={1.75} aria-hidden />
                    </span>
                    <div>
                      <p className="font-heading text-lg text-cream">Telefon</p>
                      <p className="mt-2 text-sm text-beige-dark">
                        {businessInfo.phone}
                      </p>
                    </div>
                  </div>
                </a>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card block rounded-2xl p-6 transition hover:bg-dark-hover"
                >
                  <div className="flex gap-4">
                    <span className="inline-flex shrink-0 text-gold">
                      <MessageCircle
                        className="size-6"
                        strokeWidth={1.75}
                        aria-hidden
                      />
                    </span>
                    <div>
                      <p className="font-heading text-lg text-cream">
                        WhatsApp
                      </p>
                      <p className="mt-2 text-sm text-gold">
                        Scrie-ne pe WhatsApp →
                      </p>
                    </div>
                  </div>
                </a>

                {businessInfo.instagram ? (
                  <a
                    href={businessInfo.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card block rounded-2xl p-6 transition hover:bg-dark-hover"
                  >
                    <div className="flex gap-4">
                      <span className="inline-flex shrink-0 text-gold">
                        <Instagram
                          className="size-6"
                          strokeWidth={1.75}
                          aria-hidden
                        />
                      </span>
                      <div>
                        <p className="font-heading text-lg text-cream">
                          Instagram
                        </p>
                        <p className="mt-2 text-sm text-gold">
                          Urmărește-ne →
                        </p>
                      </div>
                    </div>
                  </a>
                ) : null}

                <div className="glass-card rounded-2xl p-6">
                  <div className="flex gap-4">
                    <span className="inline-flex shrink-0 text-gold">
                      <Clock className="size-6" strokeWidth={1.75} aria-hidden />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-heading text-lg text-cream">Program</p>
                      <ul className="mt-3 space-y-2 text-sm text-beige-dark">
                        {businessInfo.openingHours.map((row) => (
                          <li
                            key={row.day}
                            className="flex justify-between gap-4"
                          >
                            <span>{row.day}</span>
                            <span className="shrink-0 text-cream/90">
                              {row.hours}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {hasEmbed ? (
              <div className="mt-14">
                <div className="glass-card overflow-hidden rounded-2xl">
                  <iframe
                    title="Hartă El Medina"
                    src={businessInfo.mapEmbed}
                    className="aspect-video w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </div>
            ) : null}

            <div className="mt-14 flex flex-col items-center gap-4 rounded-2xl border border-gold/20 bg-dark-card/80 px-6 py-10 text-center md:flex-row md:justify-center md:gap-10">
              <p className="font-heading text-xl text-cream md:text-2xl">
                Sau sună-ne direct:{' '}
                <a
                  href={telHref(businessInfo.phone)}
                  className="text-gradient-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold"
                >
                  {businessInfo.phone}
                </a>
              </p>
              <span className="hidden text-beige-dark md:inline" aria-hidden>
                |
              </span>
              <Link
                href="/rezervari"
                className="inline-flex rounded-full bg-gold px-8 py-3 font-semibold text-dark transition hover:bg-gold-light"
              >
                Rezervă o masă
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  )
}
