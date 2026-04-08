'use client'

import { useEffect, useMemo, useState, useTransition } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  AlignJustify,
  CalendarCheck,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  Settings,
  ShoppingBag,
  UtensilsCrossed,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const nav = [
  { href: '/admin', label: 'Panou', icon: LayoutDashboard },
  { href: '/admin/meniu', label: 'Meniu', icon: UtensilsCrossed },
  { href: '/admin/rezervari', label: 'Rezervări', icon: CalendarCheck },
  { href: '/admin/comenzi', label: 'Comenzi', icon: ShoppingBag },
  { href: '/admin/galerie', label: 'Galerie', icon: ImageIcon },
  { href: '/admin/setari', label: 'Setări', icon: Settings },
] as const

function breadcrumbLabel(pathname: string): string {
  const map: Record<string, string> = {
    '/admin': 'Panou',
    '/admin/meniu': 'Meniu',
    '/admin/rezervari': 'Rezervări',
    '/admin/comenzi': 'Comenzi',
    '/admin/galerie': 'Galerie',
    '/admin/setari': 'Setări',
  }
  return map[pathname] ?? 'Admin'
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [mobileOpen, setMobileOpen] = useState(false)

  const crumb = useMemo(() => breadcrumbLabel(pathname), [pathname])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    startTransition(() => {
      router.refresh()
    })
  }

  const Sidebar = (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 bg-dark-card border-r border-dark-border flex flex-col font-body transition-transform duration-300 lg:translate-x-0',
        mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      )}
    >
      <div className="p-6 border-b border-dark-border">
        <div className="flex items-center justify-between lg:block">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="El Medina"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
              <div>
                <p className="font-heading text-xl text-gradient-gold">El Medina</p>
                <span className="inline-block mt-1 text-[10px] uppercase tracking-widest text-gold/90 bg-gold/10 border border-gold/20 rounded-full px-2.5 py-0.5">
                  Admin
                </span>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="lg:hidden p-2 rounded-lg text-cream hover:bg-dark-hover"
            onClick={() => setMobileOpen(false)}
            aria-label="Închide meniul"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-r-lg text-sm font-medium transition-colors border-l-2',
                active
                  ? 'bg-gold/10 text-gold border-gold'
                  : 'text-beige-dark border-transparent hover:text-cream hover:bg-dark-hover',
              )}
            >
              <Icon className="w-5 h-5 shrink-0 opacity-90" />
              {label}
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t border-dark-border">
        <button
          type="button"
          onClick={() => void handleLogout()}
          disabled={isPending}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-beige-dark hover:text-cream hover:bg-dark-hover transition-colors text-sm font-medium disabled:pointer-events-none disabled:opacity-60"
        >
          <LogOut className="w-5 h-5" />
          Deconectare
        </button>
      </div>
    </aside>
  )

  return (
    <div className="min-h-screen bg-dark font-body">
      <AnimatePresence>
        {mobileOpen ? (
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-dark/70 backdrop-blur-sm lg:hidden"
            aria-label="Închide fundal"
            onClick={() => setMobileOpen(false)}
          />
        ) : null}
      </AnimatePresence>
      {Sidebar}
      <div className="lg:ml-64 min-h-screen bg-dark">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-4 px-4 py-4 lg:px-8 border-b border-dark-border bg-dark/90 backdrop-blur-md">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              className="lg:hidden p-2 rounded-xl text-cream hover:bg-dark-hover shrink-0"
              onClick={() => setMobileOpen(true)}
              aria-label="Deschide meniul"
            >
              <AlignJustify className="w-6 h-6" />
            </button>
            <nav className="text-sm text-beige-dark truncate" aria-label="Breadcrumb">
              <Link href="/admin" className="hover:text-gold transition-colors">
                Admin
              </Link>
              <span className="mx-2 text-dark-border">/</span>
              <span className="text-cream">{crumb}</span>
            </nav>
          </div>
          <Link
            href="/"
            className="shrink-0 text-sm font-medium text-gold hover:text-gold-light border border-gold/30 rounded-xl px-4 py-2 hover:bg-gold/10 transition-colors"
          >
            Vizitează site-ul
          </Link>
        </header>
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
