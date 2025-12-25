import { NextRequest, NextResponse } from 'next/server'

const hits = new Map<string, number>()
const LIMIT = 60

const BOT_UA_REGEX =
  /(bot|crawler|spider|crawling|scrapy|curl|wget|python|httpclient|headless)/i

export function proxy(req: NextRequest) {
  const ua = req.headers.get('user-agent') || ''
  const ip = req.ip ?? 'unknown'
  const count = (hits.get(ip) ?? 0) + 1
  hits.set(ip, count)

  if (count > LIMIT) {
    return new NextResponse('Too Many Requests', { status: 429 })
  }

  if (BOT_UA_REGEX.test(ua)) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  if (req.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  return NextResponse.next()
}
