'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Reservation } from '@/types'
import { cn } from '@/lib/utils'

const zoneLabels: Record<Reservation['zone'], string> = {
  interior: 'Interior',
  terasa: 'Terasă',
  lounge: 'Lounge',
}

const statusLabels: Record<Reservation['status'], string> = {
  pending: 'Nouă',
  confirmed: 'Confirmată',
  cancelled: 'Anulată',
}

const mockReservations: Reservation[] = [
  {
    id: 'r1',
    name: 'Maria Popescu',
    phone: '0721 234 567',
    email: 'maria@example.com',
    guests: 4,
    date: '2026-04-10',
    time: '19:30',
    zone: 'terasa',
    message: 'La fereastră, dacă se poate.',
    status: 'pending',
    createdAt: '2026-04-08T10:00:00',
  },
  {
    id: 'r2',
    name: 'Andrei Ionescu',
    phone: '0733 444 555',
    guests: 2,
    date: '2026-04-09',
    time: '20:00',
    zone: 'interior',
    status: 'confirmed',
    createdAt: '2026-04-07T14:20:00',
  },
  {
    id: 'r3',
    name: 'Elena Dumitrescu',
    phone: '0745 111 222',
    guests: 6,
    date: '2026-04-12',
    time: '13:00',
    zone: 'lounge',
    status: 'pending',
    createdAt: '2026-04-08T09:15:00',
  },
  {
    id: 'r4',
    name: 'Vlad Munteanu',
    phone: '0766 888 999',
    guests: 3,
    date: '2026-04-08',
    time: '18:00',
    zone: 'interior',
    status: 'cancelled',
    createdAt: '2026-04-05T11:00:00',
  },
]

type StatusFilter = 'all' | Reservation['status']

export default function AdminReservationsPage() {
  const [dateFilter, setDateFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [rows, setRows] = useState(mockReservations)

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      if (statusFilter !== 'all' && r.status !== statusFilter) return false
      if (dateFilter && r.date !== dateFilter) return false
      return true
    })
  }, [rows, statusFilter, dateFilter])

  const setStatus = (id: string, status: Reservation['status']) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)))
  }

  const inputSelect =
    'bg-dark-surface border border-dark-border rounded-xl px-4 py-3 text-cream focus:border-gold outline-none transition-colors'

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <h1 className="font-heading text-3xl md:text-4xl text-cream">Rezervări</h1>
        <p className="text-beige-dark mt-2">Gestionează cererile de rezervare și statusurile acestora.</p>
      </motion.div>

      <div className="glass-card rounded-xl p-4 md:p-6 flex flex-col md:flex-row md:items-end gap-4">
        <div className="flex-1">
          <label htmlFor="rez-date" className="block text-sm text-beige-dark mb-2">
            Dată
          </label>
          <input
            id="rez-date"
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className={cn(inputSelect, 'w-full md:max-w-xs')}
          />
        </div>
        <div className="flex-1">
          <label htmlFor="rez-status" className="block text-sm text-beige-dark mb-2">
            Status
          </label>
          <select
            id="rez-status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            className={cn(inputSelect, 'w-full md:max-w-xs')}
          >
            <option value="all">Toate</option>
            <option value="pending">Nouă</option>
            <option value="confirmed">Confirmată</option>
            <option value="cancelled">Anulată</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-card rounded-xl p-12 text-center text-beige-dark"
        >
          Nu există rezervări pentru perioada selectată.
        </motion.div>
      ) : (
        <div className="space-y-3">
          {filtered.map((r, i) => (
            <motion.article
              key={r.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.35 }}
              className="glass-card rounded-xl p-5 md:p-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-beige-dark text-xs uppercase tracking-wide">Nume</p>
                    <p className="text-cream font-medium">{r.name}</p>
                  </div>
                  <div>
                    <p className="text-beige-dark text-xs uppercase tracking-wide">Telefon</p>
                    <p className="text-cream">{r.phone}</p>
                  </div>
                  <div>
                    <p className="text-beige-dark text-xs uppercase tracking-wide">Dată</p>
                    <p className="text-cream">{r.date}</p>
                  </div>
                  <div>
                    <p className="text-beige-dark text-xs uppercase tracking-wide">Oră</p>
                    <p className="text-cream">{r.time}</p>
                  </div>
                  <div>
                    <p className="text-beige-dark text-xs uppercase tracking-wide">Persoane</p>
                    <p className="text-cream">{r.guests}</p>
                  </div>
                  <div>
                    <p className="text-beige-dark text-xs uppercase tracking-wide">Zonă</p>
                    <p className="text-cream">{zoneLabels[r.zone]}</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 items-start">
                  <StatusBadge status={r.status} />
                  <div className="flex flex-wrap gap-2">
                    {r.status !== 'confirmed' && (
                      <button
                        type="button"
                        onClick={() => setStatus(r.id, 'confirmed')}
                        className="px-4 py-2 rounded-xl text-sm font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 hover:bg-emerald-500/25 transition-colors"
                      >
                        Confirmă
                      </button>
                    )}
                    {r.status !== 'cancelled' && (
                      <button
                        type="button"
                        onClick={() => setStatus(r.id, 'cancelled')}
                        className="px-4 py-2 rounded-xl text-sm font-medium bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/15 transition-colors"
                      >
                        Anulează
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </div>
  )
}

function StatusBadge({ status }: { status: Reservation['status'] }) {
  const styles = {
    pending: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
    confirmed: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
    cancelled: 'bg-red-500/15 text-red-400 border-red-500/25',
  }
  return (
    <span
      className={cn(
        'inline-flex px-3 py-1 rounded-full text-xs font-semibold border',
        styles[status]
      )}
    >
      {statusLabels[status]}
    </span>
  )
}
