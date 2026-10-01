import { LeagueSeason, LeagueSeasonsApiResponse } from '@/interfaces/league'

/**
 * Returns the season whose date range contains the given date.
 *
 * @param seasons - Seasons to search for an active date range.
 * @param date - Date used to determine the active season. Defaults to the current date.
 * @returns The active season, or undefined when none is active.
 */
export const getActiveSeason = (
  seasons: LeagueSeasonsApiResponse,
  date = new Date(),
): LeagueSeason | undefined =>
  seasons.find(
    (season) =>
      date.getTime() >= new Date(season.startDate).getTime() &&
      date.getTime() <= new Date(season.endDate).getTime(),
  )

/**
 * Returns the season active on the given date, falling back to the first season.
 *
 * @param seasons - Seasons to search for an active date range.
 * @param date - Date used to determine the active season. Defaults to the current date.
 * @returns The active season, the first season when none is active, or undefined when no seasons exist.
 */
export const getCurrentSeason = (
  seasons: LeagueSeasonsApiResponse,
  date = new Date(),
): LeagueSeason | undefined => getActiveSeason(seasons, date) ?? seasons[0]

/**
 * Returns the most recently completed season before the given date.
 *
 * @param seasons - Seasons to search for a completed date range.
 * @param date - Date used to determine which seasons are complete. Defaults to the current date.
 * @returns The most recently completed season, or undefined when none has completed.
 */
export const getPreviousSeason = (
  seasons: LeagueSeasonsApiResponse,
  date = new Date(),
): LeagueSeason | undefined =>
  seasons
    .filter((season) => new Date(season.endDate).getTime() < date.getTime())
    .sort(
      (firstSeason, secondSeason) =>
        new Date(secondSeason.endDate).getTime() -
        new Date(firstSeason.endDate).getTime(),
    )[0]
