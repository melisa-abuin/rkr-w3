import type { BotFilter, PageViewFilters } from '@/interfaces/pageView'

type RawParams = Record<string, string | string[] | undefined>

const monthPattern = /^\d{4}-(0[1-9]|1[0-2])$/
const botFilters: readonly BotFilter[] = ['all', 'humans', 'bots']

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value

/**
 * Parses and validates page view filters from URL search params.
 * Invalid or missing values fall back to defaults.
 *
 * @param params - Raw search params (server `searchParams` or `Object.fromEntries(URLSearchParams)`).
 * @param now - Reference date used for the default month (UTC).
 * @returns Sanitized filters: current month, all traffic, grouped players, first page by default.
 */
export const parsePageViewFilters = (
  params: RawParams,
  now: Date = new Date(),
): PageViewFilters => {
  const month = first(params.month)
  const bots = first(params.bots)
  const page = Number(first(params.page))

  return {
    month:
      month && monthPattern.test(month) ? month : now.toISOString().slice(0, 7),
    bots: botFilters.includes(bots as BotFilter) ? (bots as BotFilter) : 'all',
    groupPlayers: first(params.groupPlayers) !== 'false',
    page: Number.isInteger(page) && page > 0 ? page : 1,
  }
}
