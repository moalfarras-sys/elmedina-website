import type { Metadata } from 'next'
import { MenuPage } from '@/components/menu/MenuPage'

export const metadata: Metadata = {
  title: 'Meniu',
  description:
    'Descoperă meniul El Medina: băuturi, cocktailuri, preparate orientale, grătar, pizza și deserturi. Savoare autentică și ingrediente alese cu grijă.',
}

export default function MeniuPage() {
  return <MenuPage />
}
