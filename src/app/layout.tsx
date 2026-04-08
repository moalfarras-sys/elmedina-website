import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { seoConfig } from '@/data/seo'
import { LayoutShell } from '@/components/layout/LayoutShell'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : seoConfig.siteUrl)

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: seoConfig.title,
    template: `%s | ${seoConfig.siteName}`,
  },
  description: seoConfig.description,
  keywords: seoConfig.keywords,
  openGraph: {
    title: seoConfig.title,
    description: seoConfig.description,
    url: siteUrl,
    siteName: seoConfig.siteName,
    images: [{ url: seoConfig.ogImage, width: 1200, height: 630 }],
    locale: seoConfig.locale,
    type: 'website',
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: { index: true, follow: true },
  icons: { icon: '/images/logo.png' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ro" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-dark text-beige antialiased">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  )
}
