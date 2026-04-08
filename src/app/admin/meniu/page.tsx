'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Pencil, Star, Trash2 } from 'lucide-react'
import { menuCategories } from '@/data/menu'
import { cn, formatPrice } from '@/lib/utils'

type ItemFlags = { recommended: boolean; visible: boolean }

export default function AdminMenuPage() {
  const [activeCategoryId, setActiveCategoryId] = useState(menuCategories[0]?.id ?? '')
  const [flags, setFlags] = useState<Record<string, ItemFlags>>(() => {
    const initial: Record<string, ItemFlags> = {}
    menuCategories.forEach((cat) => {
      cat.items.forEach((item) => {
        initial[item.id] = {
          recommended: !!item.recommended,
          visible: item.visible !== false,
        }
      })
    })
    return initial
  })

  const activeCategory = useMemo(
    () => menuCategories.find((c) => c.id === activeCategoryId),
    [activeCategoryId]
  )

  const toggle = (id: string, key: keyof ItemFlags) => {
    setFlags((prev) => ({
      ...prev,
      [id]: { ...prev[id], [key]: !prev[id][key] },
    }))
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <h1 className="font-heading text-3xl md:text-4xl text-cream">Gestionare meniu</h1>
        <p className="text-beige-dark mt-2 max-w-2xl">
          Date statice pentru moment — structura este pregătită pentru editare și salvare în baza de date.
        </p>
      </motion.div>

      <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-thin">
        {menuCategories.map((cat) => {
          const active = cat.id === activeCategoryId
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategoryId(cat.id)}
              className={cn(
                'shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-all',
                active
                  ? 'bg-gold/15 text-gold border-gold/40 shadow-[0_0_20px_rgba(201,168,76,0.12)]'
                  : 'bg-dark-surface text-beige-dark border-dark-border hover:text-cream hover:border-gold/20'
              )}
            >
              <span className="mr-1.5" aria-hidden>
                {cat.icon}
              </span>
              {cat.name}
            </button>
          )
        })}
      </div>

      <div className="space-y-2">
        {activeCategory?.items.map((item, index) => {
          const f = flags[item.id] ?? { recommended: false, visible: true }
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.02, duration: 0.3 }}
              className="glass-card rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <div className="flex-1 min-w-0">
                <p className="text-cream font-medium border-b border-dashed border-beige-dark/40 pb-0.5 w-fit">
                  {item.name}
                </p>
                <p className="text-gold mt-1 font-heading text-lg">{formatPrice(item.price)}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                <button
                  type="button"
                  onClick={() => toggle(item.id, 'recommended')}
                  className={cn(
                    'p-2.5 rounded-xl border transition-colors',
                    f.recommended
                      ? 'border-gold/40 bg-gold/10 text-gold'
                      : 'border-dark-border text-beige-dark hover:text-cream hover:bg-dark-hover'
                  )}
                  title="Recomandat"
                  aria-pressed={f.recommended}
                >
                  <Star className={cn('w-5 h-5', f.recommended && 'fill-gold/30')} />
                </button>
                <button
                  type="button"
                  onClick={() => toggle(item.id, 'visible')}
                  className={cn(
                    'p-2.5 rounded-xl border border-dark-border transition-colors',
                    f.visible ? 'text-cream bg-dark-surface' : 'text-beige-dark hover:bg-dark-hover'
                  )}
                  title={f.visible ? 'Vizibil pe site' : 'Ascuns'}
                  aria-pressed={f.visible}
                >
                  {f.visible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
                <button
                  type="button"
                  className="p-2.5 rounded-xl border border-dark-border text-beige-dark hover:text-gold hover:border-gold/30 transition-colors"
                  title="Editează"
                >
                  <Pencil className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  className="p-2.5 rounded-xl border border-red-500/20 text-red-400/90 hover:bg-red-500/10 transition-colors"
                  title="Șterge"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="pt-4">
        <button
          type="button"
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gold/20 text-gold border border-gold/30 hover:bg-gold/25 transition-colors font-medium"
        >
          Adaugă preparat
        </button>
      </div>
    </div>
  )
}
