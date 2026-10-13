import type {
  PageViewFilters,
  PageViewStat,
  PageViewSummary,
  PageViewsPage,
} from '@/interfaces/pageView'
import { getMonthRange } from '@/utils/getMonthRange'
import { pageViewPageSize } from '../constants'
import pool from './db'

const playerRoutePrefix = '/player/'
const playerRouteGroup = '/player/*'

// Params: $1 from, $2 to, $3 groupPlayers, $4 bots filter
const routeSql = `CASE WHEN $3::boolean AND route LIKE '${playerRoutePrefix}%' THEN '${playerRouteGroup}' ELSE route END`
const botSql = `($4::text = 'all' OR is_bot = ($4::text = 'bots'))`

const emptySummary: PageViewSummary = {
  totalViews: 0,
  humanViews: 0,
  botViews: 0,
  uniqueVisitors: 0,
  routeCount: 0,
}

const logError = (e: unknown) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error(e)
  }
}

async function getPageViewSummary({
  month,
  bots,
  groupPlayers,
}: PageViewFilters): Promise<PageViewSummary> {
  const { from, to } = getMonthRange(month)
  try {
    const { rows } = await pool.query(
      `
      SELECT
        COUNT(*) AS total_views,
        COUNT(*) FILTER (WHERE is_bot) AS bot_views,
        COUNT(DISTINCT visitor_id) AS unique_visitors,
        COUNT(DISTINCT ${routeSql}) FILTER (WHERE ${botSql}) AS route_count
      FROM page_views
      WHERE visited_at >= $1 AND visited_at < $2
      `,
      [from, to, groupPlayers, bots],
    )
    const totalViews = Number(rows[0].total_views)
    const botViews = Number(rows[0].bot_views)
    return {
      totalViews,
      botViews,
      humanViews: totalViews - botViews,
      uniqueVisitors: Number(rows[0].unique_visitors),
      routeCount: Number(rows[0].route_count),
    }
  } catch (e) {
    logError(e)
    return emptySummary
  }
}

async function getPageViewStats(
  { month, bots, groupPlayers }: PageViewFilters,
  page: number,
): Promise<PageViewStat[]> {
  const { from, to } = getMonthRange(month)
  try {
    const { rows } = await pool.query(
      `
      SELECT
        ${routeSql} AS route,
        COUNT(*) AS views,
        COUNT(DISTINCT visitor_id) AS unique_views,
        COUNT(*) FILTER (WHERE is_bot) AS bot_views
      FROM page_views
      WHERE visited_at >= $1 AND visited_at < $2 AND ${botSql}
      GROUP BY 1
      ORDER BY views DESC, route ASC
      LIMIT $5 OFFSET $6
      `,
      [
        from,
        to,
        groupPlayers,
        bots,
        pageViewPageSize,
        (page - 1) * pageViewPageSize,
      ],
    )
    return rows.map((row) => ({
      route: row.route,
      views: Number(row.views),
      uniqueViews: Number(row.unique_views),
      botViews: Number(row.bot_views),
    }))
  } catch (e) {
    logError(e)
    return []
  }
}

export async function getPageViews(
  filters: PageViewFilters,
): Promise<PageViewsPage> {
  const summary = await getPageViewSummary(filters)
  const totalPages = Math.max(
    1,
    Math.ceil(summary.routeCount / pageViewPageSize),
  )
  const page = Math.min(filters.page, totalPages)
  const stats = await getPageViewStats(filters, page)

  return { stats, summary, page, totalPages }
}
