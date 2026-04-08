'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import {
  CheckCircle2,
  ChevronUp,
  Loader2,
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
  X,
} from 'lucide-react'
import { menuCategories } from '@/data/menu'
import { businessInfo } from '@/data/business'
import { cn, formatPrice } from '@/lib/utils'
import { useCartStore } from '@/lib/store'
import type { MenuCategory, MenuItem, OrderItem } from '@/types'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { OrnamentalDivider } from '@/components/ui/OrnamentalDivider'
import { Badge } from '@/components/ui/Badge'

const ALL_ID = 'all' as const

const inputClass =
  'w-full rounded-xl border border-dark-border bg-dark-surface px-4 py-3 text-cream outline-none transition focus:border-gold focus:ring-1 focus:ring-gold/30'

const labelClass = 'mb-2 block text-sm font-medium text-beige-dark'

type OrderType = 'ridicare' | 'livrare'
type PaymentMethod = 'numerar' | 'card' | 'online'

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error'

type SuccessOrder = {
  orderId: string
  total: number
  items: OrderItem[]
  type: OrderType
  paymentMethod: 'numerar' | 'card'
  customerName: string
}

const initialCheckout = {
  name: '',
  phone: '',
  email: '',
  type: 'ridicare' as OrderType,
  address: '',
  notes: '',
  paymentMethod: 'numerar' as PaymentMethod,
}

function numericPrice(item: MenuItem): number | null {
  return typeof item.price === 'number' ? item.price : null
}

function CartPanelContent({
  onCheckout,
  compact,
}: {
  onCheckout: () => void
  compact?: boolean
}) {
  const items = useCartStore((s) => s.items)
  const removeItem = useCartStore((s) => s.removeItem)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const clearCart = useCartStore((s) => s.clearCart)
  const total = useCartStore((s) => s.total())

  return (
    <>
      <div
        className={cn(
          'flex items-center gap-3 border-b border-dark-border/60 pb-4',
          compact && 'pb-3',
        )}
      >
        <span className="inline-flex size-10 items-center justify-center rounded-full bg-gold/15 text-gold">
          <ShoppingCart className="size-5" strokeWidth={1.75} aria-hidden />
        </span>
        <h2 className="font-heading text-xl text-gradient-gold md:text-2xl">
          Coșul tău
        </h2>
      </div>

      {items.length === 0 ? (
        <p className="py-8 text-center text-sm text-beige-dark">
          Coșul este gol. Adaugă preparate din meniu.
        </p>
      ) : (
        <>
          <ul className={cn('max-h-[min(50vh,420px)] space-y-3 overflow-y-auto pr-1', compact && 'max-h-[40vh]')}>
            {items.map((line) => (
              <li
                key={line.menuItemId}
                className="rounded-xl border border-dark-border/50 bg-dark-surface/40 p-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-cream">{line.name}</p>
                    <p className="mt-0.5 text-xs text-beige-dark">
                      {formatPrice(line.price)} × {line.quantity}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(line.menuItemId)}
                    className="shrink-0 rounded-full p-2 text-beige-dark transition hover:bg-dark-hover hover:text-red-400"
                    aria-label={`Elimină ${line.name} din coș`}
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-1 rounded-full border border-dark-border bg-dark-card/80 p-1">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(line.menuItemId, line.quantity - 1)
                      }
                      className="inline-flex size-8 items-center justify-center rounded-full text-gold transition hover:bg-gold/15"
                      aria-label="Scade cantitatea"
                    >
                      <Minus className="size-4" />
                    </button>
                    <span className="min-w-8 text-center text-sm tabular-nums text-cream">
                      {line.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(line.menuItemId, line.quantity + 1)
                      }
                      className="inline-flex size-8 items-center justify-center rounded-full text-gold transition hover:bg-gold/15"
                      aria-label="Crește cantitatea"
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>
                  <span className="text-sm font-semibold tabular-nums text-gold">
                    {formatPrice(line.price * line.quantity)}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <OrnamentalDivider className="my-5" />

          <p className="font-heading text-2xl text-gold">
            Total: {formatPrice(total)}
          </p>

          <button
            type="button"
            onClick={onCheckout}
            className="mt-4 w-full rounded-full bg-gold py-3 font-semibold text-dark transition hover:bg-gold-light"
          >
            Finalizează comanda
          </button>

          <button
            type="button"
            onClick={() => clearCart()}
            className="mt-3 w-full text-center text-sm text-beige-dark underline-offset-4 transition hover:text-gold hover:underline"
          >
            Golește coșul
          </button>
        </>
      )}
    </>
  )
}

function MenuItemRow({ item }: { item: MenuItem }) {
  const addItem = useCartStore((s) => s.addItem)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const cartLine = useCartStore((s) =>
    s.items.find((i) => i.menuItemId === item.id),
  )
  const priceNum = numericPrice(item)
  const canOrderOnline = priceNum !== null

  const handleAdd = () => {
    if (priceNum === null) return
    addItem({
      menuItemId: item.id,
      name: item.name,
      price: priceNum,
      quantity: 1,
    })
  }

  return (
    <motion.div
      layout
      initial={false}
      className="glass-card mb-3 rounded-xl p-4"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium text-cream">{item.name}</span>
            {item.recommended ? (
              <Badge variant="gold" className="text-xs">
                Recomandat
              </Badge>
            ) : null}
            {!canOrderOnline ? (
              <Badge variant="dark" className="text-xs">
                Preț la telefon
              </Badge>
            ) : null}
          </div>
          <p className="mt-1 text-gold tabular-nums">{formatPrice(item.price)}</p>
        </div>

        <div className="flex shrink-0 items-center justify-end sm:justify-start">
          {!canOrderOnline ? (
            <a
              href={`tel:+${businessInfo.whatsapp}`}
              className="rounded-full border border-gold/30 px-4 py-1.5 text-sm text-gold transition hover:bg-gold/10"
            >
              Sună pentru preț
            </a>
          ) : cartLine ? (
            <div className="flex items-center gap-1 rounded-full border border-dark-border bg-dark-surface/80 p-1">
              <button
                type="button"
                onClick={() =>
                  updateQuantity(item.id, cartLine.quantity - 1)
                }
                className="inline-flex size-9 items-center justify-center rounded-full text-gold transition hover:bg-gold/15"
                aria-label="Scade cantitatea"
              >
                <Minus className="size-4" />
              </button>
              <span className="min-w-8 text-center text-sm tabular-nums text-cream">
                {cartLine.quantity}
              </span>
              <button
                type="button"
                onClick={() =>
                  updateQuantity(item.id, cartLine.quantity + 1)
                }
                className="inline-flex size-9 items-center justify-center rounded-full text-gold transition hover:bg-gold/15"
                aria-label="Crește cantitatea"
              >
                <Plus className="size-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleAdd}
              className="rounded-full bg-gold/20 px-4 py-1.5 text-sm text-gold transition hover:bg-gold/30"
            >
              Adaugă
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function CheckoutModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const items = useCartStore((s) => s.items)
  const total = useCartStore((s) => s.total())
  const clearCart = useCartStore((s) => s.clearCart)

  const [form, setForm] = useState(initialCheckout)
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [apiMessage, setApiMessage] = useState<string | null>(null)
  const [success, setSuccess] = useState<SuccessOrder | null>(null)
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<string, string>>
  >({})

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  useEffect(() => {
    if (!open) {
      setForm(initialCheckout)
      setStatus('idle')
      setApiMessage(null)
      setSuccess(null)
      setFieldErrors({})
    }
  }, [open])

  function validateForm(): boolean {
    const e: Partial<Record<string, string>> = {}
    if (!form.name.trim()) e.name = 'Introduceți numele.'
    if (!form.phone.trim()) e.phone = 'Introduceți numărul de telefon.'
    else if (form.phone.replace(/\D/g, '').length < 9)
      e.phone = 'Introduceți un număr de telefon valid.'
    if (form.email.trim()) {
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
      if (!ok) e.email = 'Introduceți o adresă de email validă.'
    }
    if (form.type === 'livrare' && form.address.trim().length < 5) {
      e.address = 'Introduceți adresa completă (minim 5 caractere).'
    }
    if (form.paymentMethod === 'online') {
      e.paymentMethod = 'Plata online nu este încă disponibilă.'
    }
    setFieldErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    setApiMessage(null)
    if (!validateForm()) return

    if (items.length === 0) {
      setApiMessage('Coșul este gol.')
      setStatus('error')
      return
    }

    const payment =
      form.paymentMethod === 'online' ? 'numerar' : form.paymentMethod

    setStatus('sending')
    try {
      const res = await fetch('/api/comenzi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          customerName: form.name.trim(),
          customerPhone: form.phone.trim(),
          customerEmail: form.email.trim() || undefined,
          type: form.type,
          address: form.type === 'livrare' ? form.address.trim() : undefined,
          notes: form.notes.trim() || undefined,
          paymentMethod: payment,
        }),
      })
      const data = (await res.json()) as {
        success?: boolean
        message?: string
        orderId?: string
      }

      if (!res.ok || !data.success || !data.orderId) {
        setStatus('error')
        setApiMessage(
          data.message ??
            'Nu am putut trimite comanda. Încercați din nou sau sunați-ne.',
        )
        return
      }

      const snapshot: SuccessOrder = {
        orderId: data.orderId,
        total,
        items: [...items],
        type: form.type,
        paymentMethod: payment as 'numerar' | 'card',
        customerName: form.name.trim(),
      }

      clearCart()
      setSuccess(snapshot)
      setStatus('success')
    } catch {
      setStatus('error')
      setApiMessage(
        'Eroare de rețea. Verificați conexiunea și încercați din nou.',
      )
    }
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-dark/85 backdrop-blur-sm"
            aria-label="Închide"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-title"
            className="relative z-10 flex max-h-[min(92dvh,880px)] w-full max-w-lg flex-col rounded-t-3xl sm:rounded-3xl glass-card glow-gold-sm"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-dark-border/60 px-5 py-4 sm:px-6">
              <h2
                id="checkout-title"
                className="font-heading text-xl text-gradient-gold sm:text-2xl"
              >
                {status === 'success' && success
                  ? 'Comandă confirmată'
                  : 'Finalizare comandă'}
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-beige-dark transition hover:bg-dark-hover hover:text-gold"
                aria-label="Închide fereastra"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="scrollbar-thin flex-1 overflow-y-auto px-5 py-5 sm:px-6">
              {status === 'success' && success ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05, duration: 0.35 }}
                  className="flex flex-col items-center text-center"
                >
                  <span className="inline-flex size-16 items-center justify-center rounded-full bg-gold/15 text-gold">
                    <CheckCircle2
                      className="size-9"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                  </span>
                  <p className="mt-5 font-heading text-2xl text-gradient-gold">
                    Mulțumim, {success.customerName}!
                  </p>
                  <p className="mt-2 text-sm text-beige-dark">
                    Comanda ta a fost înregistrată. Te vom contacta în curând
                    pentru confirmare.
                  </p>
                  <p className="mt-4 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-sm text-gold">
                    Număr comandă:{' '}
                    <span className="font-mono font-semibold">
                      {success.orderId}
                    </span>
                  </p>

                  <div className="mt-6 w-full rounded-2xl border border-dark-border/60 bg-dark-surface/50 p-4 text-left">
                    <p className="text-xs font-medium uppercase tracking-wider text-gold/80">
                      Rezumat
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-cream">
                      {success.items.map((line) => (
                        <li
                          key={line.menuItemId}
                          className="flex justify-between gap-2"
                        >
                          <span className="min-w-0 truncate">
                            {line.name} × {line.quantity}
                          </span>
                          <span className="shrink-0 tabular-nums text-gold">
                            {formatPrice(line.price * line.quantity)}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <OrnamentalDivider className="my-4" />
                    <div className="flex justify-between font-heading text-lg text-gold">
                      <span>Total</span>
                      <span>{formatPrice(success.total)}</span>
                    </div>
                    <p className="mt-3 text-xs text-beige-dark">
                      {success.type === 'livrare'
                        ? 'Livrare la adresa indicată'
                        : `Ridicare de la ${businessInfo.name}`}
                      {' · '}
                      {success.paymentMethod === 'numerar'
                        ? 'Plată numerar'
                        : 'Card la livrare / ridicare'}
                    </p>
                  </div>

                  <Link
                    href="/"
                    className="mt-8 inline-flex rounded-full bg-gold px-8 py-3 font-semibold text-dark transition hover:bg-gold-light"
                  >
                    Înapoi la pagina principală
                  </Link>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {items.length === 0 ? (
                    <p className="text-center text-beige-dark">
                      Coșul este gol. Adaugă preparate înainte de a finaliza.
                    </p>
                  ) : (
                    <>
                      <div className="rounded-2xl border border-dark-border/60 bg-dark-surface/40 p-4">
                        <p className="text-xs font-medium uppercase tracking-wider text-gold/80">
                          Comanda ta
                        </p>
                        <ul className="mt-3 max-h-36 space-y-2 overflow-y-auto text-sm">
                          {items.map((line) => (
                            <li
                              key={line.menuItemId}
                              className="flex justify-between gap-2 text-cream"
                            >
                              <span className="min-w-0 truncate">
                                {line.name} × {line.quantity}
                              </span>
                              <span className="shrink-0 tabular-nums text-gold">
                                {formatPrice(line.price * line.quantity)}
                              </span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-3 flex justify-between border-t border-dark-border/50 pt-3 font-heading text-gold">
                          <span>Total</span>
                          <span>{formatPrice(total)}</span>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="ord-name" className={labelClass}>
                          Nume <span className="text-red-400">*</span>
                        </label>
                        <input
                          id="ord-name"
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
                        {fieldErrors.name ? (
                          <p className="mt-1.5 text-sm text-red-400">
                            {fieldErrors.name}
                          </p>
                        ) : null}
                      </div>

                      <div>
                        <label htmlFor="ord-phone" className={labelClass}>
                          Telefon <span className="text-red-400">*</span>
                        </label>
                        <input
                          id="ord-phone"
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
                        {fieldErrors.phone ? (
                          <p className="mt-1.5 text-sm text-red-400">
                            {fieldErrors.phone}
                          </p>
                        ) : null}
                      </div>

                      <div>
                        <label htmlFor="ord-email" className={labelClass}>
                          Email
                        </label>
                        <input
                          id="ord-email"
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
                        {fieldErrors.email ? (
                          <p className="mt-1.5 text-sm text-red-400">
                            {fieldErrors.email}
                          </p>
                        ) : null}
                      </div>

                      <div>
                        <span className={labelClass}>Tip comandă</span>
                        <div className="flex flex-col gap-3 sm:flex-row">
                          {(
                            [
                              { value: 'ridicare' as const, label: 'Ridicare' },
                              { value: 'livrare' as const, label: 'Livrare' },
                            ] as const
                          ).map(({ value, label }) => (
                            <label
                              key={value}
                              className={cn(
                                'flex flex-1 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition',
                                form.type === value
                                  ? 'border-gold bg-gold/10 text-cream'
                                  : 'border-dark-border bg-dark-surface text-beige-dark hover:border-gold/40',
                              )}
                            >
                              <input
                                type="radio"
                                name="orderType"
                                value={value}
                                checked={form.type === value}
                                onChange={() =>
                                  setForm((f) => ({ ...f, type: value }))
                                }
                                className="size-4 accent-gold"
                                disabled={status === 'sending'}
                              />
                              <span className="text-sm font-medium">{label}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {form.type === 'livrare' ? (
                        <div>
                          <label htmlFor="ord-address" className={labelClass}>
                            Adresă livrare{' '}
                            <span className="text-red-400">*</span>
                          </label>
                          <textarea
                            id="ord-address"
                            name="address"
                            rows={3}
                            value={form.address}
                            onChange={(e) =>
                              setForm((f) => ({
                                ...f,
                                address: e.target.value,
                              }))
                            }
                            className={cn(inputClass, 'resize-y min-h-[100px]')}
                            disabled={status === 'sending'}
                            placeholder="Stradă, număr, bloc, scară, etaj, interfon…"
                          />
                          {fieldErrors.address ? (
                            <p className="mt-1.5 text-sm text-red-400">
                              {fieldErrors.address}
                            </p>
                          ) : null}
                        </div>
                      ) : null}

                      <div>
                        <label htmlFor="ord-notes" className={labelClass}>
                          Note (opțional)
                        </label>
                        <textarea
                          id="ord-notes"
                          name="notes"
                          rows={3}
                          value={form.notes}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, notes: e.target.value }))
                          }
                          className={cn(inputClass, 'resize-y min-h-[100px]')}
                          disabled={status === 'sending'}
                          placeholder="Alergeni, preferințe, interval orar…"
                        />
                      </div>

                      <div>
                        <span className={labelClass}>Metodă de plată</span>
                        <div className="flex flex-col gap-3">
                          {(
                            [
                              {
                                value: 'numerar' as const,
                                label: 'Numerar',
                                disabled: false,
                              },
                              {
                                value: 'card' as const,
                                label: 'Card la livrare',
                                disabled: false,
                              },
                              {
                                value: 'online' as const,
                                label: 'Online (în curând)',
                                disabled: true,
                              },
                            ] as const
                          ).map(({ value, label, disabled }) => (
                            <label
                              key={value}
                              className={cn(
                                'flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition',
                                disabled && 'cursor-not-allowed opacity-50',
                                form.paymentMethod === value && !disabled
                                  ? 'border-gold bg-gold/10 text-cream'
                                  : 'border-dark-border bg-dark-surface text-beige-dark hover:border-gold/40',
                              )}
                            >
                              <input
                                type="radio"
                                name="payment"
                                value={value}
                                checked={form.paymentMethod === value}
                                onChange={() =>
                                  !disabled &&
                                  setForm((f) => ({
                                    ...f,
                                    paymentMethod: value,
                                  }))
                                }
                                disabled={disabled || status === 'sending'}
                                className="size-4 accent-gold"
                              />
                              <span className="text-sm font-medium">{label}</span>
                            </label>
                          ))}
                        </div>
                        {fieldErrors.paymentMethod ? (
                          <p className="mt-1.5 text-sm text-red-400">
                            {fieldErrors.paymentMethod}
                          </p>
                        ) : null}
                      </div>

                      {apiMessage && status === 'error' ? (
                        <p className="text-center text-sm text-red-400">
                          {apiMessage}
                        </p>
                      ) : null}

                      <button
                        type="submit"
                        disabled={status === 'sending' || items.length === 0}
                        className="flex w-full items-center justify-center gap-2 rounded-full bg-gold py-3 font-semibold text-dark transition hover:bg-gold-light disabled:pointer-events-none disabled:opacity-50"
                      >
                        {status === 'sending' ? (
                          <>
                            <Loader2 className="size-5 animate-spin" aria-hidden />
                            Se trimite…
                          </>
                        ) : (
                          'Trimite comanda'
                        )}
                      </button>
                    </>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export function OrderPage() {
  const categories = useMemo(
    () =>
      [...menuCategories]
        .filter((c: MenuCategory) => c.visible !== false)
        .sort((a, b) => a.order - b.order),
    [],
  )

  const [activeCategoryId, setActiveCategoryId] = useState<string>(ALL_ID)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [mobileCartOpen, setMobileCartOpen] = useState(false)

  const items = useCartStore((s) => s.items)
  const total = useCartStore((s) => s.total())
  const itemCount = useCartStore((s) => s.itemCount())

  const openCheckout = useCallback(() => {
    setCheckoutOpen(true)
    setMobileCartOpen(false)
  }, [])

  const displayedBlocks = useMemo(() => {
    if (activeCategoryId === ALL_ID) {
      return categories.map((cat) => ({
        category: cat,
        items: cat.items.filter((i) => i.visible !== false),
      }))
    }
    const cat = categories.find((c) => c.id === activeCategoryId)
    if (!cat) return []
    return [
      {
        category: cat,
        items: cat.items.filter((i) => i.visible !== false),
      },
    ]
  }, [activeCategoryId, categories])

  useEffect(() => {
    if (!mobileCartOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [mobileCartOpen])

  return (
    <div className="min-h-screen bg-dark pb-28 font-body text-beige lg:pb-0">
      <section
        className="relative flex h-56 flex-col items-center justify-center overflow-hidden md:h-64"
        aria-labelledby="order-hero-title"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-b from-dark via-dark-surface to-dark"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(201,168,76,0.12),transparent_65%)]"
          aria-hidden
        />
        <ScrollReveal className="relative z-10 flex flex-col items-center px-4 text-center">
          <h1
            id="order-hero-title"
            className="font-heading text-4xl tracking-tight text-gradient-gold md:text-5xl"
          >
            Comandă online
          </h1>
          <p className="mt-3 max-w-md text-base text-beige-dark md:text-lg">
            Alege preparatele preferate și trimite comanda
          </p>
          <OrnamentalDivider className="mx-auto mt-5 max-w-sm" />
        </ScrollReveal>
      </section>

      <div className="bg-gradient-section">
        <div className="section-padding mx-auto max-w-7xl">
          <div className="mb-10 lg:hidden">
            <SectionTitle
              title="Meniu"
              subtitle="Selectează categoria și adaugă preparate în coș."
              center
              className="gap-4!"
            />
          </div>

          <div className="flex flex-col gap-10 lg:flex-row lg:gap-8">
            <main className="min-w-0 flex-1 lg:w-2/3">
              <div className="scrollbar-hide -mx-1 mb-8 flex gap-2 overflow-x-auto px-1 pb-1">
                <button
                  type="button"
                  onClick={() => setActiveCategoryId(ALL_ID)}
                  className={cn(
                    'shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200',
                    activeCategoryId === ALL_ID
                      ? 'border-gold/30 bg-gold/20 text-gold'
                      : 'border-transparent text-beige-dark hover:text-gold',
                  )}
                >
                  Toate categoriile
                </button>
                {categories.map((cat) => {
                  const isActive = activeCategoryId === cat.id
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveCategoryId(cat.id)}
                      className={cn(
                        'shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200',
                        isActive
                          ? 'border-gold/30 bg-gold/20 text-gold'
                          : 'border-transparent text-beige-dark hover:text-gold',
                      )}
                    >
                      {cat.icon ? (
                        <span className="mr-1.5" aria-hidden>
                          {cat.icon}
                        </span>
                      ) : null}
                      {cat.name}
                    </button>
                  )
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategoryId}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  {displayedBlocks.map(({ category: cat, items: catItems }) => (
                    <section
                      key={cat.id}
                      className="mb-12 last:mb-0"
                      aria-labelledby={`order-cat-${cat.id}`}
                    >
                      <ScrollReveal>
                        <h2
                          id={`order-cat-${cat.id}`}
                          className="font-heading text-2xl text-gradient-gold md:text-3xl"
                        >
                          {cat.name}
                        </h2>
                        {cat.description ? (
                          <p className="mt-1 text-sm text-beige-dark">
                            {cat.description}
                          </p>
                        ) : null}
                        <OrnamentalDivider className="mt-4 max-w-md" />
                      </ScrollReveal>

                      <div className="mt-6">
                        {catItems.map((item) => (
                          <MenuItemRow key={item.id} item={item} />
                        ))}
                      </div>
                    </section>
                  ))}
                </motion.div>
              </AnimatePresence>
            </main>

            <aside className="hidden shrink-0 lg:block lg:w-1/3">
              <div className="glass-card sticky top-24 rounded-2xl p-6">
                <CartPanelContent onCheckout={openCheckout} />
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* Mobile floating cart bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
        <motion.button
          type="button"
          layout
          onClick={() => setMobileCartOpen(true)}
          className="glass-surface flex w-full items-center justify-between gap-3 border-t border-gold/20 px-4 py-3 shadow-[0_-8px_32px_rgba(0,0,0,0.45)]"
          whileTap={{ scale: 0.995 }}
        >
          <div className="flex items-center gap-3">
            <span className="relative inline-flex size-11 items-center justify-center rounded-full bg-gold/20 text-gold">
              <ShoppingCart className="size-5" />
              {itemCount > 0 ? (
                <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-dark">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              ) : null}
            </span>
            <div className="text-left">
              <p className="text-xs font-medium uppercase tracking-wider text-gold/90">
                Coșul tău
              </p>
              <p className="text-sm font-semibold text-cream">
                {items.length === 0
                  ? 'Adaugă preparate'
                  : `${itemCount} ${itemCount === 1 ? 'articol' : 'articole'}`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-heading text-lg tabular-nums text-gold">
              {formatPrice(total)}
            </span>
            <ChevronUp className="size-5 text-beige-dark" aria-hidden />
          </div>
        </motion.button>
      </div>

      {/* Mobile bottom sheet */}
      <AnimatePresence>
        {mobileCartOpen ? (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-dark/80 backdrop-blur-sm"
              aria-label="Închide coșul"
              onClick={() => setMobileCartOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="mobile-cart-title"
              className="absolute bottom-0 left-0 right-0 max-h-[85dvh] overflow-hidden rounded-t-3xl glass-card glow-gold-sm"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-center pt-3 pb-1">
                <span className="h-1 w-10 rounded-full bg-dark-border" />
              </div>
              <div className="scrollbar-thin max-h-[calc(85dvh-2rem)] overflow-y-auto px-5 pb-8 pt-2">
                <h2 id="mobile-cart-title" className="sr-only">
                  Coșul tău
                </h2>
                <CartPanelContent
                  compact
                  onCheckout={openCheckout}
                />
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />
    </div>
  )
}
