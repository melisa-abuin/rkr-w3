import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const session = request.cookies.get('admin_session')?.value
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  return NextResponse.next()
}

export const config = {
  // Protect all routes except /login, /api/*, Next.js internals, and static assets
  matcher: [
    '/((?!login|api|_next|favicon\\.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico)).*)',
  ],
}
