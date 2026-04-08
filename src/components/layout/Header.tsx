'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '/', label: 'Acasă' },
  { href: '/meniu', label: 'Meniu' },
  { href: '/rezervari', label: 'Rezervări' },
  { href: '/galerie', label: 'Galerie' },
  { href: '/despre-noi', label: 'Despre noi' },
  { href: '/contact', label: 'Contact' },
  { href: '/comanda', label: 'Comandă' },
] as const

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [mobileOpen])

  return (
    <>
      <header className="fixed top-0 right-0 left-0 z-50 w-full">
        <div
          className={cn(
            'border-b transition-all duration-500 ease-out',
            isScrolled
              ? 'glass-card border-dark-border shadow-[0_8px_32px_rgba(0,0,0,0.35)]'
              : 'border-transparent bg-transparent shadow-none',
          )}
        >
          <nav
            className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8"
            aria-label="Principal"
          >
            <Link
              href="/"
              className="group flex shrink-0 items-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
            >
              <Image
                src="/images/logo.png"
                alt="El Medina"
                width={50}
                height={50}
                className="h-[50px] w-auto object-contain"
                priority
              />
              <span
                className={cn(
                  'font-heading text-xl tracking-tight transition-colors sm:text-2xl',
                  isScrolled ? 'text-gradient-gold' : 'text-cream',
                )}
              >
                El Medina
              </span>
            </Link>

            <ul className="hidden items-center gap-1 lg:flex xl:gap-2">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={cn(
                      'group relative px-3 py-2 text-sm font-medium tracking-wide transition-colors',
                      isScrolled ? 'text-beige' : 'text-cream/90',
                      'hover:text-gold',
                    )}
                  >
                    <span className="relative z-10">{label}</span>
                    <span
                      className="absolute bottom-1 left-3 right-3 h-px origin-left scale-x-0 bg-gold transition-transform duration-300 ease-out group-hover:scale-x-100"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="hidden items-center gap-3 lg:flex">
              <Link
                href="/rezervari"
                className="inline-flex items-center justify-center rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-dark shadow-md transition-transform duration-200 hover:scale-[1.02] hover:bg-gold-light active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
              >
                Rezervă
              </Link>
            </div>

            <button
              type="button"
              className={cn(
                'inline-flex items-center justify-center rounded-lg p-2.5 transition-colors lg:hidden',
                'text-cream hover:bg-dark-hover hover:text-gold',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60',
              )}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileOpen ? 'Închide meniul' : 'Deschide meniul'}
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen ? (
          <>
            <motion.div
              key="mobile-backdrop"
              role="presentation"
              className="fixed inset-0 z-[60] bg-dark/80 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              key="mobile-panel"
              id="mobile-navigation"
              role="dialog"
              aria-modal="true"
              aria-label="Meniu navigare"
              className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-sm flex-col bg-dark shadow-2xl lg:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between border-b border-dark-border px-4 py-4">
                <span className="font-heading text-lg text-gradient-gold">Meniu</span>
                <button
                  type="button"
                  className="rounded-lg p-2 text-beige hover:bg-dark-hover hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
                  aria-label="Închide meniul"
                  onClick={() => setMobileOpen(false)}
                >
                  <X className="size-6" />
                </button>
              </div>
              <nav className="flex flex-1 flex-col items-center justify-center gap-1 px-6 py-8">
                {NAV_LINKS.map(({ href, label }, i) => (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.28 }}
                    className="w-full max-w-xs"
                  >
                    <Link
                      href={href}
                      className="block rounded-xl px-4 py-3 text-center font-heading text-xl text-cream transition-colors hover:bg-dark-surface hover:text-gold"
                      onClick={() => setMobileOpen(false)}
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.28 }}
                  className="mt-8 w-full max-w-xs"
                >
                  <Link
                    href="/rezervari"
                    className="flex w-full items-center justify-center rounded-full bg-gold py-3.5 text-base font-semibold text-dark glow-gold-sm transition-transform hover:scale-[1.02]"
                    onClick={() => setMobileOpen(false)}
                  >
                    Rezervă
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  )
}
