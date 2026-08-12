import { deleteSession } from '@/lib/session'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const token = request.cookies.get('admin_session')?.value

  if (token) {
    await deleteSession(token)
  }

  const response = NextResponse.redirect(new URL('/login', request.url))
  response.cookies.delete('admin_session')
  return response
}
