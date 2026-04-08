'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Menu, ShoppingBag, UtensilsCrossed } from 'lucide-react'
import { menuCategories } from '@/data/menu'
import { cn } from '@/lib/utils'

const statVariants = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export default function AdminDashboardPage() {
  const menuItemCount = menuCategories.reduce((n, c) => n + c.items.length, 0)

  const stats = [
    {
      label: 'Rezervări astăzi',
      value: 0,
      icon: UtensilsCrossed,
      iconBg: 'bg-gold/10 text-gold',
    },
    {
      label: 'Comenzi noi',
      value: 0,
      icon: ShoppingBag,
      iconBg: 'bg-emerald-500/10 text-emerald-400',
    },
    {
      label: 'Produse în meniu',
      value: menuItemCount,
      icon: Menu,
      iconBg: 'bg-blue-500/10 text-blue-400',
    },
    {
      label: 'Mesaje necitite',
      value: 0,
      icon: Mail,
      iconBg: 'bg-purple-500/10 text-purple-400',
    },
  ]

  const actions = [
    { href: '/admin/meniu', title: 'Gestionează meniu', desc: 'Categorii și preparate' },
    { href: '/admin/rezervari', title: 'Vezi rezervări', desc: 'Confirmări și modificări' },
    { href: '/admin/comenzi', title: 'Comenzi', desc: 'Urmărește comenzile' },
    { href: '/admin/galerie', title: 'Galerie', desc: 'Imagini restaurant' },
    { href: '/admin/setari', title: 'Setări', desc: 'Date și SEO' },
  ]

  return (
    <div className="space-y-10">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <h1 className="font-heading text-3xl md:text-4xl text-cream">
          Bun venit în panoul de administrare
        </h1>
        <p className="mt-2 text-beige-dark max-w-2xl">
          Monitorizează rezervările, comenzile și conținutul site-ului dintr-un singur loc.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            custom={i}
            variants={statVariants}
            initial="hidden"
            animate="show"
            className="glass-card rounded-xl p-6 flex flex-col gap-4"
          >
            <div
              className={cn(
                'inline-flex items-center justify-center w-11 h-11 rounded-lg',
                s.iconBg
              )}
            >
              <s.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="font-heading text-3xl text-cream tabular-nums">{s.value}</p>
              <p className="text-sm text-beige-dark mt-1">{s.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <section>
        <h2 className="font-heading text-2xl text-cream mb-6">Acțiuni rapide</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {actions.map((a, i) => (
            <motion.div
              key={a.href}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05, duration: 0.35 }}
            >
              <Link
                href={a.href}
                className="block glass-card rounded-xl p-5 h-full hover:border-gold/30 hover:bg-dark-hover/50 transition-all group"
              >
                <p className="font-heading text-lg text-gold group-hover:text-gold-light transition-colors">
                  {a.title}
                </p>
                <p className="text-sm text-beige-dark mt-2">{a.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
