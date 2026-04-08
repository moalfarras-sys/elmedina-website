'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronDown, Phone } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

const trustBadges = [
  'Restaurant oriental',
  'Shisha lounge',
  'București',
  'Rezervări disponibile',
] as const

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-dark"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 50% -20%, rgba(201, 168, 76, 0.18) 0%, transparent 55%),
            radial-gradient(ellipse 90% 60% at 100% 50%, rgba(176, 141, 87, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse 80% 70% at 0% 80%, rgba(166, 138, 62, 0.1) 0%, transparent 45%),
            radial-gradient(circle at 50% 100%, rgba(201, 168, 76, 0.06) 0%, transparent 40%),
            linear-gradient(180deg, #0A0A0A 0%, #121212 40%, #0A0A0A 100%)
          `,
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 2px,
            rgba(201, 168, 76, 0.4) 2px,
            rgba(201, 168, 76, 0.4) 3px
          )`,
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-dark/20 to-dark" aria-hidden />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pb-24 pt-28 md:px-6 md:pb-28">
        <motion.div
          className="flex w-full max-w-4xl flex-col items-center text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-8 md:mb-10">
            <Image
              src="/images/logo.png"
              alt="El Medina"
              width={144}
              height={144}
              priority
              className="mx-auto h-28 w-28 rounded-full object-contain glow-gold md:h-36 md:w-36"
            />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-heading text-4xl leading-[1.1] tracking-tight text-cream md:text-6xl lg:text-7xl"
          >
            Bine ai venit la El Medina
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-beige-dark md:mt-8 md:text-xl"
          >
            Restaurant oriental, preparate savuroase, deserturi autentice și
            shisha premium într-o atmosferă elegantă în București.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap items-center justify-center gap-4 md:mt-12"
          >
            <Link
              href="/meniu"
              className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-3 font-semibold text-dark transition hover:bg-gold-light"
            >
              Vezi meniul
            </Link>
            <Link
              href="/rezervari"
              className="inline-flex items-center justify-center rounded-full border border-gold px-8 py-3 text-gold transition hover:bg-gold/10"
            >
              Rezervă o masă
            </Link>
            <a
              href="tel:0762751111"
              className="inline-flex items-center gap-2 text-beige-dark transition hover:text-gold"
            >
              <Phone className="h-5 w-5 shrink-0" aria-hidden />
              Sună acum
            </a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap items-center justify-center gap-3 md:mt-12"
          >
            {trustBadges.map((label) => (
              <Badge key={label} variant="dark">
                {label}
              </Badge>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2 opacity-50 md:bottom-10"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 0.5, y: 0 }}
        transition={{
          delay: 1.2,
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1] as const,
        }}
        aria-hidden
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <ChevronDown className="h-8 w-8 text-gold/70" strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  )
}
