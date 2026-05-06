import type { Metadata } from 'next'
import { IptvOsExperiencePage } from '@/components/iptv/IptvOsExperiencePage'

export const metadata: Metadata = {
  title: 'IPTV OS Experience — Android TV + Mobile',
  description:
    'Premium Android TV IPTV OS concept with native architecture, streaming engine, D-pad UX, smart ingestion, recommendations, and performance blueprint.',
  robots: { index: false, follow: false },
}

export default function IptvOsExperienceRoute() {
  return <IptvOsExperiencePage />
}
