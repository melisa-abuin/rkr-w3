import pool from './db'

export interface PageViewStat {
  route: string
  views: number
  uniqueViews: number
}

export async function getPageViews(since: Date): Promise<PageViewStat[]> {
  try {
    const { rows } = await pool.query(
      `
      SELECT route, COUNT(*) AS views, COUNT(DISTINCT visitor_id) AS unique_views
      FROM page_views
      WHERE visited_at > $1
      GROUP BY route
      ORDER BY views DESC
      `,
      [since],
    )
    return rows.map((row) => ({
      route: row.route,
      views: Number(row.views),
      uniqueViews: Number(row.unique_views),
    }))
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(e)
    }
    return []
  }
}
