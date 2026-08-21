import { LeagueSeason, LeagueSeasonsApiResponse } from '@/interfaces/league'

/**
 * Returns the season active at the given time, falling back to the first season.
 *
 * @param seasons - Seasons to search for an active date range.
 * @param now - Time used to determine the active season. Defaults to the current time.
 * @returns The active season, the first season when none is active, or undefined when no seasons exist.
 */
export const getCurrentSeason = (
  seasons: LeagueSeasonsApiResponse,
  now = Date.now(),
): LeagueSeason | undefined =>
  seasons.find(
    (season) =>
      now >= new Date(season.startDate).getTime() &&
      now <= new Date(season.endDate).getTime(),
  ) ?? seasons[0]
