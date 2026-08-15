import { NextRequest, NextResponse } from 'next/server'

const LIMIT = 60
const WINDOW_MS = 60_000

const hits = new Map<string, { count: number; resetAt: number }>()

const BOT_UA_REGEX =
  /(bot|crawler|spider|crawling|scrapy|curl|wget|python|httpclient|headless)/i

/**
 * Resolves the best available client IP from proxy and direct-IP headers.
 * Prefers the first IP from `x-forwarded-for`, then falls back to `x-real-ip`.
 */
const getClientIp = (req: NextRequest): string => {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  )
}

// TODO: remove this and use vercel firewall rules instead for better performance and reliability
export function middleware(req: NextRequest) {
  const ua = req.headers.get('user-agent') || ''
  const ip = getClientIp(req)

  if (BOT_UA_REGEX.test(ua)) {
    return new NextResponse(null, { status: 403 })
  }

  if (req.nextUrl.pathname.startsWith('/api')) {
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
  }

  return NextResponse.next()
}
