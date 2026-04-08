import { NextResponse } from 'next/server'

type ContactBody = {
  name?: string
  email?: string
  phone?: string
  subject?: string
  message?: string
}

export async function POST(request: Request) {
  let body: ContactBody
  try {
    body = (await request.json()) as ContactBody
  } catch {
    return NextResponse.json(
      { success: false, message: 'Cerere invalidă.' },
      { status: 400 },
    )
  }

  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const subject = typeof body.subject === 'string' ? body.subject.trim() : ''
  const message = typeof body.message === 'string' ? body.message.trim() : ''
  const phone =
    typeof body.phone === 'string' && body.phone.trim().length > 0
      ? body.phone.trim()
      : undefined

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      {
        success: false,
        message:
          'Completați toate câmpurile obligatorii: nume, email, subiect și mesaj.',
      },
      { status: 400 },
    )
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  if (!emailOk) {
    return NextResponse.json(
      { success: false, message: 'Adresa de email nu este validă.' },
      { status: 400 },
    )
  }

  // TODO: Integrate with email service or database
  console.log('[contact]', {
    name,
    email,
    phone,
    subject,
    message,
    receivedAt: new Date().toISOString(),
  })

  return NextResponse.json({
    success: true,
    message: 'Mesajul a fost trimis cu succes.',
  })
}
