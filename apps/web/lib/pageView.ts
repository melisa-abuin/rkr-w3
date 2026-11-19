import { isBotUserAgent } from '@/utils/isBotUserAgent'
import { maxRouteLength } from './../constants'
import pool from './db'
import { hashIp } from './hashIp'

export async function postPageView(
  route: string,
  ip: string,
  userAgent?: string | null,
): Promise<void> {
  try {
    const normalizedIp = ip.toLowerCase()
    if (!normalizedIp || normalizedIp === 'unknown') return
    if (route.includes('.png')) return
    if (process.env.NODE_ENV !== 'production') return

    const visitorId = hashIp(ip)
    const safeRoute = route.slice(0, maxRouteLength)
    const isBot = isBotUserAgent(userAgent)
    await pool.query(
      `
      INSERT INTO page_views (route, visitor_id, is_bot)
      SELECT $1, $2, $3::boolean      WHERE NOT EXISTS (
        SELECT 1 FROM page_views
        WHERE visitor_id = $2 AND route = $1
        AND visited_at > NOW() - INTERVAL '1 hour'
      )
    `,
      [safeRoute, visitorId, isBot],
    )
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed to post page view:', err)
    }
  }
}
