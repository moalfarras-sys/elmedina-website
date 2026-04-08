import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contactează El Medina — adresă, telefon, WhatsApp, Instagram și program. Trimite-ne un mesaj sau rezervă o masă.',
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
