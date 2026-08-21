import pool from './db'

export interface PageView {
  route: string
  visitorId: string
}

export async function getPageViews(since: Date): Promise<PageView[]> {
  try {
    const { rows } = await pool.query(
      `SELECT route, visitor_id FROM page_views WHERE visited_at > $1 AND visitor_id IS NOT NULL`,
      [since],
    )
    return rows.map((row) => ({
      route: row.route as string,
      visitorId: row.visitor_id as string,
    }))
  } catch (e) {
    console.error(e)
    return []
  }
}
