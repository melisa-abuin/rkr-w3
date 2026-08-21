import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: ['/((?!_next/image|_next/static|favicon.ico|robots.txt|sitemap).*)'],
}

export function middleware(req: NextRequest) {
  const headers = new Headers(req.headers)
  headers.set('x-pathname', req.nextUrl.pathname)
  return NextResponse.next({ request: { headers } })
}
