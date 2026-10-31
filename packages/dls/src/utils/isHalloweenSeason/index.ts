/**
 * Checks whether the given date falls in October.
 *
 * @param date - Date to check. Defaults to the current date.
 * @returns `true` if the month is October (local time), otherwise `false`.
 */
export const isHalloweenSeason = (date: Date = new Date()): boolean =>
  date.getMonth() === 9
