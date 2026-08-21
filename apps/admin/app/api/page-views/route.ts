import { getPageViews } from '@/lib/pageView'
import { getSession } from '@/lib/session'
import { NextRequest, NextResponse } from 'next/server'

const PERIOD_MS = {
  '24h': 24 * 60 * 60 * 1000,
  month: 30 * 24 * 60 * 60 * 1000,
  year: 365 * 24 * 60 * 60 * 1000,
} as const

type Period = keyof typeof PERIOD_MS

const isValidPeriod = (value: string): value is Period => value in PERIOD_MS

export async function GET(request: NextRequest) {
  const token = request.cookies.get('admin_session')?.value
  const user = token ? await getSession(token) : null
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const period = request.nextUrl.searchParams.get('period') ?? 'year'
  if (!isValidPeriod(period)) {
    return NextResponse.json({ error: 'Invalid period' }, { status: 400 })
  }

  const since = new Date(Date.now() - PERIOD_MS[period])
  const views = await getPageViews(since)

  const routeMap = new Map<string, Set<string>>()
  for (const { route, visitorId } of views) {
    if (!routeMap.has(route)) routeMap.set(route, new Set())
    routeMap.get(route)!.add(visitorId)
  }

  const stats = [...routeMap.entries()]
    .map(([route, visitors]) => ({ route, views: visitors.size }))
    .sort((a, b) => b.views - a.views)

  return NextResponse.json(stats)
}
