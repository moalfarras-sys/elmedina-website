'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Order } from '@/types'
import { cn, formatPrice } from '@/lib/utils'

const mockOrders: Order[] = [
  {
    id: 'ORD-24081',
    customerName: 'Cristina Vasile',
    customerPhone: '0722 100 200',
    type: 'livrare',
    address: 'Str. Exemplu 10, București',
    paymentMethod: 'numerar',
    status: 'pending',
    total: 124,
    createdAt: '2026-04-08T11:30:00',
    items: [
      { menuItemId: 'fp-5', name: 'Shaorma pui', price: 45, quantity: 2 },
      { menuItemId: 'br-4', name: 'Pepsi', price: 14, quantity: 2 },
    ],
  },
  {
    id: 'ORD-24082',
    customerName: 'Mihai Georgescu',
    customerPhone: '0740 333 444',
    type: 'ridicare',
    paymentMethod: 'card',
    status: 'preparing',
    total: 89,
    createdAt: '2026-04-08T12:05:00',
    items: [
      { menuItemId: 'gt-2', name: 'Adana kebab', price: 57, quantity: 1 },
      { menuItemId: 'gr-1', name: 'Cartofi prăjiți', price: 19, quantity: 1 },
    ],
  },
  {
    id: 'ORD-24083',
    customerName: 'Ana Stancu',
    customerPhone: '0761 555 666',
    type: 'ridicare',
    paymentMethod: 'online',
    status: 'ready',
    total: 52,
    createdAt: '2026-04-07T18:40:00',
    items: [{ menuItemId: 'ds-1', name: 'Kunafeh', price: 29, quantity: 1 }],
  },
]

type StatusFilter = 'all' | Order['status']

const statusLabels: Record<Order['status'], string> = {
  pending: 'Nouă',
  preparing: 'În pregătire',
  ready: 'Gata',
  delivered: 'Livrată',
  cancelled: 'Anulată',
}

const typeLabels: Record<Order['type'], string> = {
  ridicare: 'Ridicare',
  livrare: 'Livrare',
}

export default function AdminOrdersPage() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [orders, setOrders] = useState(mockOrders)

  const filtered = useMemo(() => {
    if (statusFilter === 'all') return orders
    return orders.filter((o) => o.status === statusFilter)
  }, [orders, statusFilter])

  const updateStatus = (id: string, status: Order['status']) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)))
  }

  const inputSelect =
    'bg-dark-surface border border-dark-border rounded-xl px-4 py-3 text-cream focus:border-gold outline-none transition-colors w-full max-w-md'

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <h1 className="font-heading text-3xl md:text-4xl text-cream">Comenzi</h1>
        <p className="text-beige-dark mt-2">Urmărește și actualizează statusul comenzilor.</p>
      </motion.div>

      <div className="glass-card rounded-xl p-4 md:p-6">
        <label htmlFor="order-status" className="block text-sm text-beige-dark mb-2">
          Filtrează după status
        </label>
        <select
          id="order-status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
          className={inputSelect}
        >
          <option value="all">Toate</option>
          <option value="pending">Nouă</option>
          <option value="preparing">În pregătire</option>
          <option value="ready">Gata</option>
          <option value="delivered">Livrată</option>
          <option value="cancelled">Anulată</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-card rounded-xl p-12 text-center text-beige-dark"
        >
          Nu există comenzi pentru filtrul selectat.
        </motion.div>
      ) : (
        <div className="space-y-5">
          {filtered.map((order, i) => (
            <motion.article
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.35 }}
              className="glass-card rounded-xl p-6 space-y-5"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <p className="text-gold font-heading text-xl">{order.id}</p>
                  <p className="text-cream font-medium mt-1">{order.customerName}</p>
                  <p className="text-beige-dark text-sm mt-0.5">{order.customerPhone}</p>
                  <p className="text-beige-dark text-sm mt-2">
                    <span className="text-cream/80">{typeLabels[order.type]}</span>
                    {order.address && ` · ${order.address}`}
                  </p>
                </div>
                <div className="flex flex-col items-start gap-2">
                  <OrderStatusBadge status={order.status} />
                  <p className="font-heading text-2xl text-cream">{formatPrice(order.total)}</p>
                </div>
              </div>

              <ul className="border-t border-dark-border pt-4 space-y-2">
                {order.items.map((line) => (
                  <li
                    key={`${order.id}-${line.menuItemId}`}
                    className="flex justify-between text-sm text-beige-dark"
                  >
                    <span className="text-cream">
                      {line.quantity}× {line.name}
                    </span>
                    <span>{formatPrice(line.price * line.quantity)}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2 border-t border-dark-border">
                <span className="text-sm text-beige-dark shrink-0">Schimbă status:</span>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(statusLabels) as Order['status'][]).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => updateStatus(order.id, s)}
                      className={cn(
                        'px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors',
                        order.status === s
                          ? 'border-gold bg-gold/15 text-gold'
                          : 'border-dark-border text-beige-dark hover:text-cream hover:border-gold/25'
                      )}
                    >
                      {statusLabels[s]}
                    </button>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </div>
  )
}

function OrderStatusBadge({ status }: { status: Order['status'] }) {
  const styles: Record<Order['status'], string> = {
    pending: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
    preparing: 'bg-sky-500/15 text-sky-400 border-sky-500/25',
    ready: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
    delivered: 'bg-violet-500/15 text-violet-300 border-violet-500/25',
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
