import Image from 'next/image'
import Link from 'next/link'
import { Instagram, MapPin, Phone } from 'lucide-react'
import { businessInfo } from '@/data/business'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '/', label: 'Acasă' },
  { href: '/meniu', label: 'Meniu' },
  { href: '/rezervari', label: 'Rezervări' },
  { href: '/galerie', label: 'Galerie' },
  { href: '/despre-noi', label: 'Despre noi' },
  { href: '/contact', label: 'Contact' },
  { href: '/comanda', label: 'Comandă' },
] as const

const telHref = `+${businessInfo.whatsapp}`

export function Footer() {
  return (
    <footer className="relative mt-auto border-t border-dark-border bg-linear-to-b from-dark-surface via-dark-card to-dark text-beige">
      <div className="mx-auto max-w-7xl px-4 pt-14 pb-8 sm:px-6 lg:px-8">
        <div className="ornament-line mb-14" aria-hidden>
          <span className="inline-flex size-2 rotate-45 border border-gold/40 bg-gold/20 shadow-[0_0_12px_rgba(201,168,76,0.25)]" />
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div className="flex flex-col gap-5">
            <Link href="/" className="inline-flex items-center gap-3 w-fit">
              <Image
                src="/images/logo.png"
                alt="El Medina"
                width={48}
                height={48}
                className="h-12 w-auto object-contain"
              />
              <span className="font-heading text-xl text-gradient-gold sm:text-2xl">
                El Medina
              </span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-beige-dark">
              Preparate orientale autentice, shisha premium și o atmosferă elegantă în inima
              Bucureștiului.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-lg text-gold mb-5 tracking-wide">Navigare</h3>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={cn(
                      'text-sm text-beige-dark transition-colors duration-200',
                      'hover:text-gold',
                    )}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-lg text-gold mb-5 tracking-wide">Program</h3>
            <ul className="flex flex-col gap-2">
              {businessInfo.openingHours.map(({ day, hours }) => (
                <li
                  key={day}
                  className="flex justify-between gap-4 text-sm text-beige-dark border-b border-dark-border/60 pb-2 last:border-0"
                >
                  <span className="text-beige/90">{day}</span>
                  <span className="tabular-nums text-beige-dark">{hours}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-lg text-gold mb-5 tracking-wide">Contact</h3>
            <ul className="flex flex-col gap-4 text-sm">
              <li className="flex gap-3 text-beige-dark">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold/80" aria-hidden />
                <span className="leading-relaxed">{businessInfo.address}</span>
              </li>
              <li>
                <a
                  href={`tel:${telHref}`}
                  className="inline-flex items-center gap-2 text-beige-dark transition-colors hover:text-gold"
                >
                  <Phone className="size-4 text-gold/80" aria-hidden />
                  {businessInfo.phone}
                </a>
              </li>
              <li>
                <a
                  href={businessInfo.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-beige-dark underline decoration-gold/30 underline-offset-4 transition-colors hover:text-gold hover:decoration-gold/60"
                >
                  Google Maps
                </a>
              </li>
              <li>
                <a
                  href={businessInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-beige-dark transition-colors hover:text-gold"
                >
                  <Instagram className="size-4 text-gold/80" aria-hidden />
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-dark-border pt-8 sm:flex-row sm:gap-6">
          <p className="text-center text-xs text-beige-dark/90 sm:text-left sm:text-sm">
            © 2024 El Medina Shisha Café &amp; Restaurant. Toate drepturile rezervate.
          </p>
          <a
            href={businessInfo.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-beige-dark transition-colors hover:text-gold"
            aria-label="El Medina pe Instagram"
          >
            <Instagram className="size-4" aria-hidden />
            <span>@elmedina_shishacafe_restaurant</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
