'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { menuCategories } from '@/data/menu'
import { businessInfo } from '@/data/business'
import { cn, formatPrice } from '@/lib/utils'
import type { MenuCategory, MenuItem } from '@/types'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Badge } from '@/components/ui/Badge'
import { OrnamentalDivider } from '@/components/ui/OrnamentalDivider'

const ALLERGENS = [
  'Gluten',
  'Lactate',
  'Ouă',
  'Pește',
  'Soia',
  'Nuci',
  'Arahide',
  'Semințe de susan',
] as const

function normalizeSearch(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
}

function itemMatchesQuery(item: MenuItem, q: string): boolean {
  if (!q.trim()) return true
  const n = normalizeSearch(q)
  return normalizeSearch(item.name).includes(n)
}

export function MenuPage() {
  const categories = useMemo(
    () =>
      [...menuCategories]
        .filter((c: MenuCategory) => c.visible !== false)
        .sort((a, b) => a.order - b.order),
    [],
  )

  const [activeCategoryId, setActiveCategoryId] = useState<string>(
    categories[0]?.id ?? '',
  )
  const [allergenOpen, setAllergenOpen] = useState(false)
  const [search, setSearch] = useState('')
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map())

  const query = search.trim()

  const filteredBySearch = useMemo(() => {
    if (!query) {
      return categories.map((cat) => ({
        category: cat,
        items: cat.items.filter((i) => i.visible !== false),
      }))
    }
    return categories
      .map((cat) => ({
        category: cat,
        items: cat.items.filter(
          (i) => i.visible !== false && itemMatchesQuery(i, query),
        ),
      }))
      .filter((block) => block.items.length > 0)
  }, [categories, query])

  const hasAnyResults = filteredBySearch.some((b) => b.items.length > 0)

  const setSectionRef = useCallback((id: string, el: HTMLElement | null) => {
    const m = sectionRefs.current
    if (el) m.set(id, el)
    else m.delete(id)
  }, [])

  useEffect(() => {
    if (!query) return
    const first = filteredBySearch[0]?.category.id
    if (first) setActiveCategoryId(first)
  }, [query, filteredBySearch])

  useEffect(() => {
    const ids = query
      ? filteredBySearch.map((b) => b.category.id)
      : categories.map((c) => c.id)
    const sections = ids
      .map((id) => sectionRefs.current.get(id))
      .filter(Boolean) as HTMLElement[]
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (intersecting[0]?.target.id) {
          setActiveCategoryId(intersecting[0].target.id)
        }
      },
      {
        root: null,
        rootMargin: '-130px 0px -52% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    )

    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [categories, query, filteredBySearch])

  useEffect(() => {
    if (!allergenOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [allergenOpen])

  const scrollToCategory = (id: string) => {
    const el = sectionRefs.current.get(id)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const telHref = `tel:+${businessInfo.whatsapp}`

  return (
    <div className="min-h-screen bg-dark font-body text-beige">
      {/* Hero */}
      <section
        className="relative flex h-64 flex-col items-center justify-center overflow-hidden md:h-80"
        aria-labelledby="menu-hero-title"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-b from-dark via-dark-surface to-dark"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(201,168,76,0.12),transparent_65%)]"
          aria-hidden
        />
        <div className="relative z-10 flex flex-col items-center px-4 text-center">
          <h1
            id="menu-hero-title"
            className="font-heading text-5xl tracking-tight text-gradient-gold"
          >
            Meniu
          </h1>
          <p className="mt-3 max-w-md text-base text-beige-dark md:text-lg">
            Savoare orientală în fiecare preparat
          </p>
          <OrnamentalDivider className="mx-auto mt-6 max-w-md" />
        </div>
      </section>

      {/* Sticky category nav */}
      <div className="sticky top-[72px] z-30 border-b border-dark-border/80 glass-surface">
        <div className="scrollbar-hide mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
          {(query ? filteredBySearch.map((b) => b.category) : categories).map(
            (cat) => {
              const isActive = activeCategoryId === cat.id
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => scrollToCategory(cat.id)}
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
            },
          )}
          <button
            type="button"
            onClick={() => setAllergenOpen(true)}
            className="shrink-0 rounded-full border border-gold/20 px-4 py-2 text-sm font-medium text-gold transition-colors hover:border-gold/40 hover:bg-gold/10"
          >
            Alergeni
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="bg-gradient-section">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:max-w-4xl lg:px-8">
          {/* Search */}
          <ScrollReveal>
            <div className="relative mb-10">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-gold/60"
                aria-hidden
              />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Caută în meniu…"
                className="w-full rounded-full border border-dark-border/80 bg-dark-surface/50 py-3.5 pl-12 pr-5 text-sm text-cream placeholder:text-beige-dark/70 glass-surface transition-colors focus:border-gold/40 focus:outline-none focus:ring-1 focus:ring-gold/30"
                aria-label="Caută preparate în meniu"
              />
            </div>
          </ScrollReveal>

          {!hasAnyResults ? (
            <ScrollReveal>
              <p className="rounded-2xl border border-dark-border bg-dark-card/50 px-6 py-12 text-center text-beige-dark">
                Nu am găsit preparate care să corespundă căutării tale.
              </p>
            </ScrollReveal>
          ) : (
            filteredBySearch.map(({ category: cat, items }, catIndex) => (
              <section
                key={cat.id}
                id={cat.id}
                ref={(el) => setSectionRef(cat.id, el)}
                className={cn(
                  'scroll-mt-[148px] md:scroll-mt-[156px]',
                  catIndex < filteredBySearch.length - 1 && 'mb-16',
                )}
                aria-labelledby={`cat-${cat.id}`}
              >
                <ScrollReveal>
                  <header className="mb-6 text-center md:text-left">
                    <h2
                      id={`cat-${cat.id}`}
                      className="font-heading text-2xl tracking-tight text-gradient-gold md:text-3xl"
                    >
                      {cat.name}
                    </h2>
                    {cat.description ? (
                      <p className="mt-2 text-sm text-beige-dark md:text-base">
                        {cat.description}
                      </p>
                    ) : null}
                    <OrnamentalDivider
                      className={cn(
                        'mt-4',
                        'md:mx-0 md:max-w-md md:justify-start',
                      )}
                    />
                  </header>
                </ScrollReveal>

                <ul className="divide-y divide-dark-border/40 rounded-2xl border border-dark-border/60 overflow-hidden">
                  {items.map((item, index) => (
                    <li
                      key={item.id}
                      className={cn(
                        'px-4 py-4 sm:px-5',
                        index % 2 === 1 && 'bg-dark-surface/30',
                      )}
                    >
                      <div className="flex flex-col gap-2 sm:gap-1">
                        <div className="flex w-full min-w-0 items-end gap-2 sm:items-baseline sm:gap-3">
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                              <span className="text-lg font-medium text-cream">
                                {item.name}
                              </span>
                              {item.recommended ? (
                                <Badge variant="gold" className="align-middle">
                                  Recomandat
                                </Badge>
                              ) : null}
                            </div>
                          </div>
                          <span
                            className="mb-1 min-h-px min-w-3 flex-1 border-b border-dotted border-dark-border sm:mb-1.5"
                            aria-hidden
                          />
                          <span className="shrink-0 text-right text-lg font-semibold tabular-nums text-gold">
                            {formatPrice(item.price)}
                          </span>
                        </div>
                        {item.description ? (
                          <p className="max-w-2xl pl-0 text-sm leading-relaxed text-beige-dark sm:pr-28">
                            {item.description}
                          </p>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            ))
          )}

          {/* Bottom CTA */}
          <ScrollReveal className="mt-20">
            <div className="relative overflow-hidden rounded-2xl border border-gold/20 bg-dark-card/80 p-8 text-center md:p-10 glow-gold-sm">
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,168,76,0.08),transparent_55%)]"
                aria-hidden
              />
              <div className="relative">
                <h3 className="font-heading text-2xl text-gradient-gold md:text-3xl">
                  Ai ales ce dorești?
                </h3>
                <p className="mx-auto mt-3 max-w-md text-sm text-beige-dark md:text-base">
                  Rezervă o masă sau comandă online — suntem aici pentru tine.
                </p>
                <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
                  <Link
                    href="/rezervari"
                    className="inline-flex items-center justify-center rounded-full border border-gold/40 bg-gold/15 px-8 py-3 text-sm font-semibold text-gold transition-colors hover:bg-gold/25"
                  >
                    Rezervă o masă
                  </Link>
                  <Link
                    href="/comanda"
                    className="inline-flex items-center justify-center rounded-full border border-dark-border bg-dark-surface px-8 py-3 text-sm font-semibold text-cream transition-colors hover:border-gold/30 hover:text-gold"
                  >
                    Comandă online
                  </Link>
                </div>
                <a
                  href={telHref}
                  className="mt-6 inline-flex items-center justify-center gap-2 text-sm text-beige-dark transition-colors hover:text-gold"
                >
                  <span className="text-beige-dark/80">Sună-ne:</span>
                  <span className="font-semibold tabular-nums text-gold">
                    {businessInfo.phone}
                  </span>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Allergen modal */}
      <AnimatePresence>
        {allergenOpen ? (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-dark/80 backdrop-blur-sm"
              aria-label="Închide"
              onClick={() => setAllergenOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="allergen-modal-title"
              className="relative z-10 w-full max-w-lg rounded-2xl p-8 glass-card glow-gold-sm"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setAllergenOpen(false)}
                className="absolute right-4 top-4 rounded-full p-2 text-beige-dark transition-colors hover:bg-dark-hover hover:text-gold"
                aria-label="Închide fereastra"
              >
                <X className="size-5" />
              </button>
              <h2
                id="allergen-modal-title"
                className="font-heading pr-10 text-2xl text-gradient-gold"
              >
                Informații despre alergeni
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-beige-dark md:text-base">
                Pentru informații detaliate despre alergenii din preparatele
                noastre, vă rugăm să întrebați personalul nostru. Suntem
                pregătiți să vă oferim toate detaliile necesare pentru o
                experiență culinară sigură și plăcută.
              </p>
              <p className="mt-6 text-xs font-medium uppercase tracking-wider text-gold/80">
                Alergeni frecvenți
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {ALLERGENS.map((a) => (
                  <Badge key={a} variant="dark">
                    {a}
                  </Badge>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
