/**
 * Returns the UTC boundaries of a calendar month.
 *
 * @param month - Month in `YYYY-MM` format.
 * @returns `from` (inclusive) and `to` (exclusive) dates at UTC midnight.
 */
export const getMonthRange = (month: string): { from: Date; to: Date } => {
  const [year, monthNumber] = month.split('-').map(Number)
  return {
    from: new Date(Date.UTC(year, monthNumber - 1, 1)),
    to: new Date(Date.UTC(year, monthNumber, 1)),
  }
}
