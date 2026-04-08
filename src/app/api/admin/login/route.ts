import { NextResponse } from 'next/server'
import {
  ADMIN_SESSION_COOKIE,
  getAdminCredentials,
  getAdminSessionValue,
} from '@/lib/admin-session'

type LoginBody = {
  username?: string
  password?: string
}

export async function POST(request: Request) {
  let body: LoginBody
  try {
    body = (await request.json()) as LoginBody
  } catch {
    return NextResponse.json(
      { success: false, message: 'Cerere invalidă.' },
      { status: 400 },
    )
  }

  const username = typeof body.username === 'string' ? body.username.trim() : ''
  const password = typeof body.password === 'string' ? body.password : ''
  const expected = getAdminCredentials()

  if (username !== expected.username || password !== expected.password) {
    return NextResponse.json(
      { success: false, message: 'Utilizator sau parolă incorectă.' },
      { status: 401 },
    )
  }

  const response = NextResponse.json({ success: true })
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: getAdminSessionValue(),
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 12,
  })

  return response
}
