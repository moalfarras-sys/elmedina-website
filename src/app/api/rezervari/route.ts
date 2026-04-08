import { NextResponse } from 'next/server'

type Zone = 'interior' | 'terasa' | 'lounge'

type ReservationBody = {
  name?: string
  phone?: string
  email?: string
  partySize?: string
  date?: string
  time?: string
  zone?: string
  message?: string
  consent?: boolean
}

const zones: Zone[] = ['interior', 'terasa', 'lounge']

function todayISO(): string {
  const d = new Date()
  const y = d.getFullYear()
  const mo = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${mo}-${day}`
}

export async function POST(request: Request) {
  let body: ReservationBody
  try {
    body = (await request.json()) as ReservationBody
  } catch {
    return NextResponse.json(
      { success: false, message: 'Cerere invalidă.' },
      { status: 400 },
    )
  }

  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const phone = typeof body.phone === 'string' ? body.phone.trim() : ''
  const email =
    typeof body.email === 'string' && body.email.trim().length > 0
      ? body.email.trim()
      : undefined
  const partySize =
    typeof body.partySize === 'string' ? body.partySize.trim() : ''
  const date = typeof body.date === 'string' ? body.date.trim() : ''
  const time = typeof body.time === 'string' ? body.time.trim() : ''
  const zone = typeof body.zone === 'string' ? body.zone.trim() : ''
  const message =
    typeof body.message === 'string' && body.message.trim().length > 0
      ? body.message.trim()
      : undefined

  if (!name) {
    return NextResponse.json(
      { success: false, message: 'Numele este obligatoriu.' },
      { status: 400 },
    )
  }
  if (!phone || phone.replace(/\D/g, '').length < 9) {
    return NextResponse.json(
      { success: false, message: 'Telefonul nu este valid.' },
      { status: 400 },
    )
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { success: false, message: 'Emailul nu este valid.' },
      { status: 400 },
    )
  }
  if (!partySize) {
    return NextResponse.json(
      { success: false, message: 'Selectați numărul de persoane.' },
      { status: 400 },
    )
  }
  const partyOk =
    partySize === '10+' ||
    (/^\d+$/.test(partySize) &&
      Number(partySize) >= 1 &&
      Number(partySize) <= 9)
  if (!partyOk) {
    return NextResponse.json(
      { success: false, message: 'Numărul de persoane nu este valid.' },
      { status: 400 },
    )
  }
  if (!date) {
    return NextResponse.json(
      { success: false, message: 'Data este obligatorie.' },
      { status: 400 },
    )
  }
  const min = todayISO()
  if (date < min) {
    return NextResponse.json(
      { success: false, message: 'Data nu poate fi în trecut.' },
      { status: 400 },
    )
  }
  if (!time || !/^\d{2}:\d{2}$/.test(time)) {
    return NextResponse.json(
      { success: false, message: 'Ora nu este validă.' },
      { status: 400 },
    )
  }
  if (!zones.includes(zone as Zone)) {
    return NextResponse.json(
      { success: false, message: 'Zona selectată nu este validă.' },
      { status: 400 },
    )
  }
  if (body.consent !== true) {
    return NextResponse.json(
      {
        success: false,
        message: 'Este necesar acordul pentru prelucrarea datelor personale.',
      },
      { status: 400 },
    )
  }

  // TODO: Integrate with email service or database
  console.log('[rezervare]', {
    name,
    phone,
    email,
    partySize,
    date,
    time,
    zone,
    message,
    receivedAt: new Date().toISOString(),
  })

  return NextResponse.json({
    success: true,
    message: 'Cererea de rezervare a fost înregistrată.',
  })
}
