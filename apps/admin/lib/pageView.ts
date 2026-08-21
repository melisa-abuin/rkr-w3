import pool from './db'

export interface PageViewStat {
  route: string
  views: number
}

export async function getPageViews(since: Date): Promise<PageViewStat[]> {
  try {
    const { rows } = await pool.query(
      `
      SELECT route, COUNT(DISTINCT visitor_id) AS views
      FROM page_views
      WHERE visited_at > $1
      GROUP BY route
      ORDER BY views DESC
      `,
      [since],
    )
    return rows.map((row) => ({
      route: row.route,
      views: row.views,
    }))
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(e)
    }
    return []
  }
}
