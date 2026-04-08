import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type BadgeVariant = 'gold' | 'dark' | 'outline'

export type BadgeProps = {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  gold: 'border-gold/30 bg-gold/20 text-gold',
  dark: 'border-dark-border bg-dark-surface text-beige-dark',
  outline: 'border-gold/40 bg-transparent text-gold',
}

export function Badge({
  children,
  variant = 'gold',
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full border px-3 py-1 text-xs font-medium',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
