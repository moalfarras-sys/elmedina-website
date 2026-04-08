import type { Metadata } from 'next'
import { OrderPage } from '@/components/order/OrderPage'

export const metadata: Metadata = {
  title: 'Comandă online',
  description:
    'Comandă online preparatele preferate de la El Medina Shisha Café & Restaurant. Alege din meniu, completează datele și trimite comanda rapid și simplu.',
}

export default function ComandaPage() {
  return <OrderPage />
}
