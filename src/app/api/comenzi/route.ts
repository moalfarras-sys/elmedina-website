import { NextResponse } from 'next/server'
import { generateId } from '@/lib/utils'

type OrderItemBody = {
  menuItemId?: string
  name?: string
  price?: unknown
  quantity?: unknown
}

type OrderBody = {
  items?: OrderItemBody[]
  customerName?: string
  customerPhone?: string
  customerEmail?: string
  type?: string
  address?: string
  notes?: string
  paymentMethod?: string
}

function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)
}

function validateItems(items: OrderItemBody[] | undefined): items is {
  menuItemId: string
  name: string
  price: number
  quantity: number
}[] {
  if (!Array.isArray(items) || items.length === 0) return false
  for (const row of items) {
    const id = typeof row.menuItemId === 'string' ? row.menuItemId.trim() : ''
    const name = typeof row.name === 'string' ? row.name.trim() : ''
    const price = row.price
    const qty = row.quantity
    if (!id || !name) return false
    if (typeof price !== 'number' || !Number.isFinite(price) || price < 0)
      return false
    if (
      typeof qty !== 'number' ||
      !Number.isInteger(qty) ||
      qty < 1 ||
      qty > 99
    )
      return false
  }
  return true
}

export async function POST(request: Request) {
  let body: OrderBody
  try {
    body = (await request.json()) as OrderBody
  } catch {
    return NextResponse.json(
      { success: false, message: 'Cerere invalidă.' },
      { status: 400 },
    )
  }

  if (!validateItems(body.items)) {
    return NextResponse.json(
      {
        success: false,
        message: 'Coșul este gol sau articolele nu sunt valide.',
      },
      { status: 400 },
    )
  }

  const items = body.items.map((row) => ({
    menuItemId: row.menuItemId!.trim(),
    name: row.name!.trim(),
    price: row.price as number,
    quantity: row.quantity as number,
  }))

  const customerName =
    typeof body.customerName === 'string' ? body.customerName.trim() : ''
  const customerPhone =
    typeof body.customerPhone === 'string' ? body.customerPhone.trim() : ''
  const customerEmail =
    typeof body.customerEmail === 'string' && body.customerEmail.trim().length > 0
      ? body.customerEmail.trim()
      : undefined

  if (!customerName) {
    return NextResponse.json(
      { success: false, message: 'Numele este obligatoriu.' },
      { status: 400 },
    )
  }
  if (!customerPhone || customerPhone.replace(/\D/g, '').length < 9) {
    return NextResponse.json(
      { success: false, message: 'Telefonul nu este valid.' },
      { status: 400 },
    )
  }
  if (customerEmail && !isValidEmail(customerEmail)) {
    return NextResponse.json(
      { success: false, message: 'Adresa de email nu este validă.' },
      { status: 400 },
    )
  }

  const type = typeof body.type === 'string' ? body.type.trim() : ''
  if (type !== 'ridicare' && type !== 'livrare') {
    return NextResponse.json(
      { success: false, message: 'Tipul comenzii nu este valid.' },
      { status: 400 },
    )
  }

  const address =
    typeof body.address === 'string' ? body.address.trim() : undefined
  if (type === 'livrare' && (!address || address.length < 5)) {
    return NextResponse.json(
      {
        success: false,
        message: 'Pentru livrare, adresa este obligatorie (minim 5 caractere).',
      },
      { status: 400 },
    )
  }

  const notes =
    typeof body.notes === 'string' && body.notes.trim().length > 0
      ? body.notes.trim()
      : undefined

  const paymentMethod =
    typeof body.paymentMethod === 'string' ? body.paymentMethod.trim() : ''
  if (paymentMethod !== 'numerar' && paymentMethod !== 'card') {
    return NextResponse.json(
      { success: false, message: 'Metoda de plată selectată nu este disponibilă.' },
      { status: 400 },
    )
  }

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const orderId = generateId()

  // TODO: Persist order to database and send notifications (email/SMS/WhatsApp) to kitchen and customer
  console.log('[comandă]', {
    orderId,
    items,
    customerName,
    customerPhone,
    customerEmail,
    type,
    address: type === 'livrare' ? address : undefined,
    notes,
    paymentMethod,
    total,
    receivedAt: new Date().toISOString(),
  })

  return NextResponse.json({
    success: true,
    message: 'Comanda a fost înregistrată cu succes.',
    orderId,
    order: {
      id: orderId,
      items,
      customerName,
      customerPhone,
      customerEmail,
      type,
      address: type === 'livrare' ? address : undefined,
      notes,
      paymentMethod,
      total,
      createdAt: new Date().toISOString(),
    },
  })
}

export async function GET() {
  // TODO: Admin-only listing from database
  return NextResponse.json([])
}
