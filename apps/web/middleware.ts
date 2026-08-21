import { NextRequest, NextResponse } from 'next/server'

const LIMIT = 60
const WINDOW_MS = 60_000

const hits = new Map<string, { count: number; resetAt: number }>()

const BOT_UA_REGEX =
  /(bot|crawler|spider|crawling|scrapy|curl|wget|python|httpclient|headless)/i

// x-real-ip is set by Vercel infrastructure and cannot be spoofed; x-forwarded-for[0] can.
const getClientIp = (req: NextRequest): string => {
  return (
    req.headers.get('x-real-ip') ||
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  )
}

// TODO: remove this and use vercel firewall rules instead for better performance and reliability
export const config = {
  matcher: ['/((?!_next/image|_next/static|favicon.ico|robots.txt|sitemap).*)'],
}

export function middleware(req: NextRequest) {
  const ua = req.headers.get('user-agent') || ''
  const ip = getClientIp(req)

  if (BOT_UA_REGEX.test(ua)) {
    return new NextResponse(null, { status: 403 })
  }

  const now = Date.now()
  const entry = hits.get(ip)
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS })
  } else {
    entry.count += 1
    if (entry.count > LIMIT) {
      return new NextResponse(null, { status: 429 })
    }
  }

  const headers = new Headers(req.headers)
  headers.set('x-pathname', req.nextUrl.pathname)
  return NextResponse.next({ request: { headers } })
}
