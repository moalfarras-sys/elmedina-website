'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

export type ScrollRevealDirection = 'up' | 'down' | 'left' | 'right'

export type ScrollRevealProps = {
  children: ReactNode
  className?: string
  /** Seconds; applied to the reveal transition */
  delay?: number
  direction?: ScrollRevealDirection
}

const hiddenOffsets: Record<
  ScrollRevealDirection,
  { x?: number; y?: number }
> = {
  up: { y: 36 },
  down: { y: -36 },
  left: { x: 36 },
  right: { x: -36 },
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const offset = hiddenOffsets[direction]

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={{ opacity: 0, x: offset.x ?? 0, y: offset.y ?? 0 }}
      animate={
        isInView
          ? {
              opacity: 1,
              x: 0,
              y: 0,
              transition: {
                duration: 0.55,
                delay,
                ease: [0.22, 1, 0.36, 1],
              },
            }
          : { opacity: 0, x: offset.x ?? 0, y: offset.y ?? 0 }
      }
    >
      {children}
    </motion.div>
  )
}
