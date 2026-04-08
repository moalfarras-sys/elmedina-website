'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error'

type Zone = 'interior' | 'terasa' | 'lounge'

const inputClass =
  'w-full rounded-xl border border-dark-border bg-dark-surface px-4 py-3 text-cream outline-none transition focus:border-gold focus:ring-1 focus:ring-gold/30'

const labelClass = 'mb-2 block text-sm font-medium text-beige-dark'

function buildTimeSlots(): string[] {
  const slots: string[] = []
  for (let minutes = 12 * 60; minutes <= 23 * 60; minutes += 30) {
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`)
  }
  return slots
}

function todayISO(): string {
  const d = new Date()
  const y = d.getFullYear()
  const mo = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${mo}-${day}`
}

type FieldErrors = Partial<
  Record<
    | 'name'
    | 'phone'
    | 'email'
    | 'partySize'
    | 'date'
    | 'time'
    | 'zone'
    | 'consent'
    | 'general',
    string
  >
>

const initialForm = {
  name: '',
  phone: '',
  email: '',
  partySize: '',
  date: '',
  time: '',
  zone: 'interior' as Zone,
  message: '',
  consent: false,
}

export function ReservationForm() {
  const timeSlots = useMemo(() => buildTimeSlots(), [])
  const minDate = useMemo(() => todayISO(), [])

  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [apiMessage, setApiMessage] = useState<string | null>(null)

  function validate(): boolean {
    const next: FieldErrors = {}

    if (!form.name.trim()) next.name = 'Introduceți numele.'
    if (!form.phone.trim()) next.phone = 'Introduceți numărul de telefon.'
    else if (form.phone.replace(/\D/g, '').length < 9)
      next.phone = 'Introduceți un număr de telefon valid.'

    if (form.email.trim()) {
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
      if (!ok) next.email = 'Introduceți o adresă de email validă.'
    }

    if (!form.partySize) next.partySize = 'Selectați numărul de persoane.'
    if (!form.date) next.date = 'Selectați data.'
    else if (form.date < minDate) next.date = 'Data nu poate fi în trecut.'

    if (!form.time) next.time = 'Selectați ora.'
    if (!form.zone) next.zone = 'Selectați zona preferată.'
    if (!form.consent)
      next.consent = 'Trebuie să fiți de acord cu prelucrarea datelor personale.'

    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setApiMessage(null)
    if (!validate()) return

    setStatus('sending')
    try {
      const res = await fetch('/api/rezervari', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim() || undefined,
          partySize: form.partySize,
          date: form.date,
          time: form.time,
          zone: form.zone,
          message: form.message.trim() || undefined,
          consent: form.consent,
        }),
      })
      const data = (await res.json()) as { success?: boolean; message?: string }

      if (!res.ok || !data.success) {
        setStatus('error')
        setApiMessage(
          data.message ??
            'Nu am putut trimite cererea. Încercați din nou sau sunați-ne.',
        )
        return
      }

      setStatus('success')
      setForm(initialForm)
      setErrors({})
    } catch {
      setStatus('error')
      setApiMessage(
        'Eroare de rețea. Verificați conexiunea și încercați din nou.',
      )
    }
  }

  function handleRetry() {
    setStatus('idle')
    setApiMessage(null)
  }

  if (status === 'success') {
    return (
      <div className="glass-card glow-gold-sm rounded-2xl p-8 md:p-10">
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex size-16 items-center justify-center rounded-full bg-gold/15 text-gold">
            <CheckCircle2 className="size-9" strokeWidth={1.75} aria-hidden />
          </span>
          <h3 className="font-heading mt-6 text-2xl text-gradient-gold md:text-3xl">
            Cererea a fost trimisă!
          </h3>
          <p className="mt-3 max-w-md text-beige-dark">
            Vă vom contacta în cel mai scurt timp pentru confirmare.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex rounded-full bg-gold px-8 py-3 font-semibold text-dark transition hover:bg-gold-light"
          >
            Înapoi la pagina principală
          </Link>
        </div>
      </div>
    )
  }

  if (status === 'error' && apiMessage) {
    return (
      <div className="glass-card rounded-2xl p-8 md:p-10">
        <p className="text-center text-red-400">{apiMessage}</p>
        <div className="mt-6 flex justify-center gap-4">
          <button
            type="button"
            onClick={handleRetry}
            className="rounded-full border border-gold/40 px-6 py-2.5 text-sm font-semibold text-gold transition hover:bg-gold/10"
          >
            Încearcă din nou
          </button>
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-card rounded-2xl p-6 md:p-8"
      noValidate
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="md:col-span-1">
          <label htmlFor="rez-name" className={labelClass}>
            Nume <span className="text-red-400">*</span>
          </label>
          <input
            id="rez-name"
            name="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className={inputClass}
            disabled={status === 'sending'}
          />
          {errors.name ? (
            <p className="mt-1.5 text-sm text-red-400">{errors.name}</p>
          ) : null}
        </div>

        <div className="md:col-span-1">
          <label htmlFor="rez-phone" className={labelClass}>
            Telefon <span className="text-red-400">*</span>
          </label>
          <input
            id="rez-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            className={inputClass}
            disabled={status === 'sending'}
          />
          {errors.phone ? (
            <p className="mt-1.5 text-sm text-red-400">{errors.phone}</p>
          ) : null}
        </div>

        <div className="md:col-span-1">
          <label htmlFor="rez-email" className={labelClass}>
            Email
          </label>
          <input
            id="rez-email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className={inputClass}
            disabled={status === 'sending'}
          />
          {errors.email ? (
            <p className="mt-1.5 text-sm text-red-400">{errors.email}</p>
          ) : null}
        </div>

        <div className="md:col-span-1">
          <label htmlFor="rez-party" className={labelClass}>
            Număr persoane <span className="text-red-400">*</span>
          </label>
          <select
            id="rez-party"
            name="partySize"
            value={form.partySize}
            onChange={(e) =>
              setForm((f) => ({ ...f, partySize: e.target.value }))
            }
            className={cn(inputClass, 'appearance-none bg-dark-surface')}
            disabled={status === 'sending'}
          >
            <option value="">Selectați</option>
            {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={String(n)}>
                {n}
              </option>
            ))}
            <option value="10+">10+</option>
          </select>
          {errors.partySize ? (
            <p className="mt-1.5 text-sm text-red-400">{errors.partySize}</p>
          ) : null}
        </div>

        <div className="md:col-span-1">
          <label htmlFor="rez-date" className={labelClass}>
            Data <span className="text-red-400">*</span>
          </label>
          <input
            id="rez-date"
            name="date"
            type="date"
            min={minDate}
            value={form.date}
            onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
            className={inputClass}
            disabled={status === 'sending'}
          />
          {errors.date ? (
            <p className="mt-1.5 text-sm text-red-400">{errors.date}</p>
          ) : null}
        </div>

        <div className="md:col-span-1">
          <label htmlFor="rez-time" className={labelClass}>
            Ora <span className="text-red-400">*</span>
          </label>
          <select
            id="rez-time"
            name="time"
            value={form.time}
            onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
            className={cn(inputClass, 'appearance-none bg-dark-surface')}
            disabled={status === 'sending'}
          >
            <option value="">Selectați</option>
            {timeSlots.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.time ? (
            <p className="mt-1.5 text-sm text-red-400">{errors.time}</p>
          ) : null}
        </div>
      </div>

      <div className="mt-6">
        <span className={labelClass}>Zonă preferată</span>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {(
            [
              { value: 'interior' as const, label: 'Interior' },
              { value: 'terasa' as const, label: 'Terasă' },
              { value: 'lounge' as const, label: 'Lounge' },
            ] as const
          ).map(({ value, label }) => (
            <label
              key={value}
              className={cn(
                'flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition',
                form.zone === value
                  ? 'border-gold bg-gold/10 text-cream'
                  : 'border-dark-border bg-dark-surface text-beige-dark hover:border-gold/40',
              )}
            >
              <input
                type="radio"
                name="zone"
                value={value}
                checked={form.zone === value}
                onChange={() => setForm((f) => ({ ...f, zone: value }))}
                className="size-4 accent-gold"
                disabled={status === 'sending'}
              />
              <span className="text-sm font-medium">{label}</span>
            </label>
          ))}
        </div>
        {errors.zone ? (
          <p className="mt-1.5 text-sm text-red-400">{errors.zone}</p>
        ) : null}
      </div>

      <div className="mt-6 md:col-span-2">
        <label htmlFor="rez-message" className={labelClass}>
          Mesaj / cerințe speciale
        </label>
        <textarea
          id="rez-message"
          name="message"
          rows={4}
          value={form.message}
          onChange={(e) =>
            setForm((f) => ({ ...f, message: e.target.value }))
          }
          className={cn(inputClass, 'resize-y min-h-[120px]')}
          disabled={status === 'sending'}
        />
      </div>

      <div className="mt-6">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(e) =>
              setForm((f) => ({ ...f, consent: e.target.checked }))
            }
            className="mt-1 size-4 shrink-0 accent-gold"
            disabled={status === 'sending'}
          />
          <span className="text-sm text-beige-dark">
            Sunt de acord cu prelucrarea datelor personale{' '}
            <span className="text-red-400">*</span>
          </span>
        </label>
        {errors.consent ? (
          <p className="mt-1.5 text-sm text-red-400">{errors.consent}</p>
        ) : null}
      </div>

      <div className="mt-8 flex justify-center md:justify-start">
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
            'Trimite cererea de rezervare'
          )}
        </button>
      </div>
    </form>
  )
}
