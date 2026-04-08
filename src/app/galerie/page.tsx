import type { Metadata } from 'next'
import { GalleryContent } from './GalleryContent'

export const metadata: Metadata = {
  title: 'Galerie',
  description:
    'Explorează galeria El Medina — imagini din restaurantul nostru oriental din București. Urmărește-ne pe Instagram pentru noutăți și atmosferă.',
}

export default function GaleriePage() {
  return <GalleryContent />
}
