import { cn } from '@/lib/utils'

export type OrnamentalDividerProps = {
  className?: string
}

/**
 * Decorative horizontal rule: gradient lines fading outward with a centered gold diamond.
 * CSS-only (no SVG defs / ids) so multiple instances are safe on one page.
 */
export function OrnamentalDivider({ className }: OrnamentalDividerProps) {
  const lineStyle = (direction: 'left' | 'right') =>
    ({
      background:
        direction === 'left'
          ? 'linear-gradient(90deg, transparent 0%, var(--color-gold-dark) 45%, var(--color-gold) 100%)'
          : 'linear-gradient(270deg, transparent 0%, var(--color-gold-dark) 45%, var(--color-gold) 100%)',
    }) as const

  return (
    <div
      className={cn(
        'flex w-full max-w-2xl items-center justify-center gap-0 py-2',
        className,
      )}
      role="separator"
      aria-hidden
    >
      <span className="h-px min-h-px flex-1" style={lineStyle('left')} />
      <span
        className="mx-3 inline-block size-2.5 shrink-0 rotate-45 border border-gold-dark/60 shadow-[0_0_10px_rgba(201,168,76,0.25)]"
        style={{
          background:
            'linear-gradient(135deg, var(--color-gold-light), var(--color-gold), var(--color-bronze))',
        }}
      />
      <span className="h-px min-h-px flex-1" style={lineStyle('right')} />
    </div>
  )
}
