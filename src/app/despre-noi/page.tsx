import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Coffee, Flame, Phone, UtensilsCrossed } from 'lucide-react'
import { businessInfo } from '@/data/business'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { OrnamentalDivider } from '@/components/ui/OrnamentalDivider'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Despre noi',
  description:
    'Descoperă povestea El Medina — restaurant oriental în București, cu preparate autentice, deserturi speciale, băuturi fresh și shisha premium într-un ambient cald și ospitalier.',
}

const experienceItems = [
  {
    icon: UtensilsCrossed,
    title: 'Preparate autentice',
    description:
      'Fiecare preparat este pregătit cu ingrediente atent selecționate, după rețete tradiționale orientale adaptate gusturilor moderne.',
  },
  {
    icon: Coffee,
    title: 'Băuturi & Deserturi',
    description:
      'De la cafea arabă și fresh-uri naturale până la kunafeh și madlouah, fiecare sorbitură și fiecare desert sunt o călătorie a simțurilor.',
  },
  {
    icon: Flame,
    title: 'Shisha premium',
    description:
      'Selecție premium de arome pentru shisha într-un ambient relaxant, perfect pentru seri liniștite alături de prieteni.',
  },
] as const

const atmosphereBadges = [
  'Preparate autentice',
  'Shisha premium',
  'Ambient oriental',
  'Serviciu de calitate',
] as const

function PageHero() {
  return (
    <section
      className="relative flex h-64 items-center justify-center overflow-hidden md:h-80"
      aria-labelledby="despre-hero-heading"
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
          id="despre-hero-heading"
          className="font-heading text-4xl tracking-tight text-gradient-gold md:text-5xl"
        >
          Despre noi
        </h1>
        <p className="mt-3 font-body text-lg text-beige-dark md:text-xl">
          Povestea El Medina
        </p>
      </div>
    </section>
  )
}

export default function DespreNoiPage() {
  const telHref = `tel:${businessInfo.phone.replace(/\s/g, '')}`

  return (
    <>
      <PageHero />

      <section className="section-padding">
        <ScrollReveal className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="flex justify-center lg:justify-start">
              <div
                className={cn(
                  'glass-card glow-gold rounded-2xl p-8',
                  'flex items-center justify-center',
                )}
              >
                <Image
                  src="/images/logo.png"
                  alt="Logo El Medina"
                  width={300}
                  height={300}
                  className="h-auto max-h-[300px] w-full max-w-[300px] object-contain"
                  priority
                />
              </div>
            </div>
            <div className="font-body">
              <h2 className="font-heading text-3xl text-gradient-gold">
                Povestea locului
              </h2>
              <p className="mt-6 text-base leading-relaxed text-beige-dark md:text-lg">
                El Medina este mai mult decât un restaurant. Este un loc unde gusturile
                orientale, atmosfera caldă și serile relaxante se întâlnesc într-un spațiu
                creat pentru experiențe memorabile. De la preparate autentice și deserturi
                speciale până la băuturi răcoritoare și shisha premium, fiecare detaliu este
                gândit pentru confort, savoare și ospitalitate.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="section-padding bg-gradient-section">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <SectionTitle title="Experiența orientală" className="mb-14 md:mb-16" />
          </ScrollReveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {experienceItems.map((item, index) => {
              const Icon = item.icon
              return (
                <ScrollReveal key={item.title} delay={index * 0.12}>
                  <article className="glass-card h-full rounded-2xl p-8 text-center">
                    <Icon
                      className="mx-auto mb-4 h-12 w-12 text-gold"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                    <h3 className="font-heading mb-3 text-xl text-cream">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-beige-dark md:text-base">
                      {item.description}
                    </p>
                  </article>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <SectionTitle title="Ambient și relaxare" className="mb-12 md:mb-14" />
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <p className="mx-auto max-w-3xl text-center font-body text-base leading-relaxed text-beige-dark md:text-lg">
              Spațiul El Medina a fost conceput pentru a oferi o evadare din rutina zilnică.
              Lumini calde, muzică ambientală, decor oriental și un serviciu atent – totul
              contribuie la o seară pe care o vei dori să o repeți. Indiferent dacă preferi o
              masă intimă, o ieșire cu prietenii sau o ocazie specială, El Medina te
              întâmpină cu ospitalitate și rafinament.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.14} className="mt-10 md:mt-12">
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              {atmosphereBadges.map((label) => (
                <div
                  key={label}
                  className="glass-card rounded-xl px-6 py-4 text-center transition hover:border-gold/25"
                >
                  <p className="font-heading text-gold">{label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding bg-gradient-section">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl text-gradient-gold">
            Te așteptăm la El Medina
          </h2>
          <OrnamentalDivider className="mx-auto mt-6 max-w-md" />
          <p className="mt-8 font-body text-base leading-relaxed text-beige-dark md:text-lg">
            Rezervă o masă și descoperă un loc unde fiecare detaliu este creat pentru tine.
            Preparate savuroase, deserturi speciale, băuturi fresh și shisha premium – toate
            într-un ambient care te face să te simți ca acasă.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/rezervari"
              className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-3 font-semibold text-dark transition hover:bg-gold-light"
            >
              Rezervă o masă
            </Link>
            <Link
              href="/meniu"
              className="inline-flex items-center justify-center rounded-full border border-gold px-8 py-3 text-gold transition hover:bg-gold/10"
            >
              Vezi meniul
            </Link>
          </div>
          <a
            href={telHref}
            className="mt-8 inline-flex items-center justify-center gap-2 font-body text-beige-dark transition hover:text-gold"
          >
            <Phone className="h-5 w-5 shrink-0" aria-hidden />
            <span>{businessInfo.phone}</span>
          </a>
        </ScrollReveal>
      </section>
    </>
  )
}
