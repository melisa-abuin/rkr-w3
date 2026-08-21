import { createHmac } from 'crypto'
import pool from './db'

// Consistent per-IP for dedup queries; secret prevents brute-force reversal.
const hashIp = (ip: string): string => {
  const secret = process.env.IP_HMAC_SECRET
  if (!secret) throw new Error('IP_HMAC_SECRET is not set')
  return createHmac('sha256', secret).update(ip).digest('hex')
}

const MAX_ROUTE_LENGTH = 255

export async function postPageView(route: string, ip: string): Promise<void> {
  try {
    const visitorId = hashIp(ip)
    const safeRoute = route.slice(0, MAX_ROUTE_LENGTH)
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
  } catch {
    // non-critical, do not block the request
  }
}
