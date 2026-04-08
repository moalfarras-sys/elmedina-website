'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Camera,
  Flame,
  Heart,
  Music,
  Sparkles,
  Star,
  UtensilsCrossed,
  Wine,
  X,
} from 'lucide-react'
import { businessInfo } from '@/data/business'
import { cn } from '@/lib/utils'

const placeholderIcons = [
  Camera,
  UtensilsCrossed,
  Flame,
  Music,
  Star,
  Sparkles,
  Wine,
  Heart,
] as const

function PageHero() {
  return (
    <section
      className="relative flex h-64 items-center justify-center overflow-hidden"
      aria-labelledby="galerie-hero-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-dark" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 50% -20%, rgba(201, 168, 76, 0.18) 0%, transparent 55%),
            radial-gradient(ellipse 90% 60% at 100% 50%, rgba(176, 141, 87, 0.12) 0%, transparent 50%),
            linear-gradient(180deg, #0A0A0A 0%, #121212 50%, #0A0A0A 100%)
          `,
        }}
        aria-hidden
      />
      <div className="relative z-10 px-4 text-center">
        <h1
          id="galerie-hero-heading"
          className="font-heading text-4xl tracking-tight text-gradient-gold md:text-5xl"
        >
          Galerie
        </h1>
        <p className="mt-3 font-body text-lg text-beige-dark md:text-xl">
          Imagini din lumea El Medina
        </p>
      </div>
    </section>
  )
}

export function GalleryContent() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const instagramUrl = businessInfo.instagram

  const closeLightbox = useCallback(() => setLightboxOpen(false), [])

  useEffect(() => {
    if (!lightboxOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [lightboxOpen, closeLightbox])

  return (
    <>
      <PageHero />

      <section className="section-padding">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-4">
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              className={cn(
                'group glass-card relative flex min-h-[200px] cursor-zoom-in flex-col items-center justify-center overflow-hidden rounded-2xl border border-transparent bg-dark-card p-6 text-left transition hover:border-gold/20 md:col-span-2 md:row-span-2 md:min-h-[320px]',
              )}
              aria-label="Deschide imaginea logo El Medina la dimensiune completă"
            >
              <Image
                src="/images/logo.png"
                alt="El Medina — logo"
                width={400}
                height={400}
                className="h-auto max-h-[min(280px,50vh)] w-full object-contain transition duration-300 group-hover:scale-[1.02] md:max-h-[min(360px,55vh)]"
                priority
              />
              <span className="mt-4 font-body text-xs text-gold/60 md:text-sm">
                Atinge pentru a mări
              </span>
            </button>

            {placeholderIcons.map((Icon, i) => (
              <div
                key={i}
                className="group glass-card flex aspect-square flex-col items-center justify-center rounded-2xl border border-transparent transition hover:border-gold/20"
              >
                <Icon
                  className="h-16 w-16 text-gold/15"
                  strokeWidth={1.25}
                  aria-hidden
                />
                <p className="mt-3 font-body text-sm text-beige-dark/30">În curând</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-section">
        <div className="mx-auto max-w-2xl px-4 text-center font-body">
          <p className="text-base text-beige-dark md:text-lg">
            {instagramUrl ? (
              <>
                <Link
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold underline decoration-gold/40 underline-offset-4 transition hover:text-gold-light"
                >
                  Urmărește-ne pe Instagram
                </Link>{' '}
                pentru mai multe imagini.
              </>
            ) : (
              <>
                <span className="text-beige">Urmărește-ne pe Instagram</span> pentru mai multe
                imagini.
              </>
            )}
          </p>
          <p className="mt-6 text-sm text-beige-dark/80 md:text-base">
            Ai fotografii de la El Medina?{' '}
            <span className="text-beige">
              Împărtășește-le cu noi pe Instagram.
            </span>
          </p>
        </div>
      </section>

      <AnimatePresence>
        {lightboxOpen ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Imagine mărită"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="relative flex max-h-[85vh] w-full max-w-3xl items-center justify-center pt-10 md:pt-0"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeLightbox}
                className="absolute right-0 top-0 z-10 rounded-full p-2 text-cream transition hover:bg-white/10 md:right-2 md:top-2"
                aria-label="Închide"
              >
                <X className="h-8 w-8" strokeWidth={1.5} />
              </button>
              <div className="relative aspect-square w-full max-w-lg md:max-w-2xl">
                <Image
                  src="/images/logo.png"
                  alt="El Medina"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 896px"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
