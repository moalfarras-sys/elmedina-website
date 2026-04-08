import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type SectionTitleProps = {
  title: ReactNode
  subtitle?: ReactNode
  className?: string
  /** When true, title block is centered; when false, left-aligned */
  center?: boolean
}

function OrnamentWithDiamond({ className }: { className?: string }) {
  return (
    <div className={cn('relative flex w-full items-center', className)} aria-hidden>
      <span
        className="h-px min-w-8 flex-1"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, var(--color-gold-dark) 50%, var(--color-gold) 100%)',
        }}
      />
      <span className="mx-3 inline-flex size-2 shrink-0 rotate-45 border border-gold/50 bg-gold/25 shadow-[0_0_12px_rgba(201,168,76,0.35)]" />
      <span
        className="h-px min-w-8 flex-1"
        style={{
          background:
            'linear-gradient(270deg, transparent 0%, var(--color-gold-dark) 50%, var(--color-gold) 100%)',
        }}
      />
    </div>
  )
}

export function SectionTitle({
  title,
  subtitle,
  className,
  center = true,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-5 md:gap-6',
        center ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      <OrnamentWithDiamond
        className={cn(
          center ? 'max-w-md justify-center' : 'max-w-none justify-start',
        )}
      />
      <h2
        className={cn(
          'font-heading text-3xl leading-tight tracking-tight text-gradient-gold md:text-4xl lg:text-5xl',
          center ? 'max-w-4xl' : 'max-w-3xl',
        )}
      >
        {title}
      </h2>
      {subtitle != null && subtitle !== '' ? (
        <p
          className={cn(
            'max-w-2xl text-base leading-relaxed text-beige-dark md:text-lg',
            center && 'mx-auto',
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}
