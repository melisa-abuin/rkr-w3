import { createHmac } from 'crypto'
import { maxRouteLength } from './../constants'
import pool from './db'

const hashIp = (ip: string): string => {
  const secret = process.env.IP_HMAC_SECRET
  if (!secret) throw new Error('IP_HMAC_SECRET is not set')
  return createHmac('sha256', secret).update(ip).digest('hex')
}

export async function postPageView(route: string, ip: string): Promise<void> {
  try {
    const normalizedIp = ip.toLowerCase()
    if (!normalizedIp || normalizedIp === 'unknown') return

    const visitorId = hashIp(ip)
    const safeRoute = route.slice(0, maxRouteLength)
    await pool.query(
      `
      INSERT INTO page_views (route, visitor_id)
      SELECT $1, $2
      WHERE NOT EXISTS (
        SELECT 1 FROM page_views
        WHERE visitor_id = $2 AND route = $1
        AND visited_at > NOW() - INTERVAL '1 hour'
      )
    `,
      [safeRoute, visitorId],
    )
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed to post page view:', err)
    }
  }
}
