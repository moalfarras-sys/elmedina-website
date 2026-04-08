'use client'

import { useState, useTransition } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'

export function AdminLogin() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const inputClass =
    'w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-3 text-cream placeholder:text-beige-dark/60 focus:border-gold outline-none transition-colors'

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      const data = (await res.json()) as { success?: boolean; message?: string }

      if (!res.ok || !data.success) {
        setError(data.message ?? 'Autentificarea a eșuat.')
        return
      }

      startTransition(() => {
        router.refresh()
      })
    } catch {
      setError('Nu am putut contacta serverul. Încercați din nou.')
    }
  }

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-6 font-body relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-gold/5 via-transparent to-transparent" />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
        className="glass-card rounded-2xl p-8 w-full max-w-md relative z-10"
      >
        <h1 className="font-heading text-2xl md:text-3xl text-center text-cream mb-2">
          Administrare El Medina
        </h1>
        <p className="text-center text-beige-dark text-sm mb-8">
          Panou securizat pentru echipă
        </p>
        <div className="flex justify-center mb-8">
          <Image
            src="/images/logo.png"
            alt="El Medina"
            width={120}
            height={120}
            className="object-contain drop-shadow-[0_0_24px_rgba(201,168,76,0.25)]"
            priority
          />
        </div>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="admin-user" className="block text-sm text-beige-dark mb-2">
              Utilizator
            </label>
            <input
              id="admin-user"
              name="username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={inputClass}
              disabled={isPending}
            />
          </div>
          <div>
            <label htmlFor="admin-pass" className="block text-sm text-beige-dark mb-2">
              Parolă
            </label>
            <input
              id="admin-pass"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
              disabled={isPending}
            />
          </div>
          <AnimatePresence mode="wait">
            {error ? (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3"
                role="alert"
              >
                {error}
              </motion.p>
            ) : null}
          </AnimatePresence>
          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-xl bg-gold text-dark font-medium py-3.5 hover:bg-gold-light transition-colors disabled:pointer-events-none disabled:opacity-70"
          >
            {isPending ? 'Se autentifică...' : 'Autentificare'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}
