export type BotFilter = 'all' | 'humans' | 'bots'

export interface PageViewFilters {
  /** Selected month in `YYYY-MM` format (UTC). */
  month: string
  bots: BotFilter
  groupPlayers: boolean
  page: number
}

export interface PageViewStat {
  route: string
  views: number
  uniqueViews: number
  botViews: number
}

export interface PageViewSummary {
  totalViews: number
  humanViews: number
  botViews: number
  uniqueVisitors: number
  routeCount: number
}

export interface PageViewsPage {
  stats: PageViewStat[]
  summary: PageViewSummary
  page: number
  totalPages: number
}
