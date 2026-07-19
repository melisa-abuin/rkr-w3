/**
 * Returns the number of days remaining until a given date.
 * Uses `Math.ceil` so that a partial day counts as a full day.
 *
 * @param date - ISO date string representing the target date.
 * @returns Number of days until the date, or 0 if the date has already passed.
 */
export const getDaysUntil = (date: string): number => {
  const diff = new Date(date).getTime() - Date.now()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}
