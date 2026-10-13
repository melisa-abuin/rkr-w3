/**
 * Builds a list of the most recent months, newest first, for use in selects.
 *
 * @param now - Reference date; its UTC month is the first option.
 * @param count - Number of months to return.
 * @returns Options with a `YYYY-MM` value and an English "Month YYYY" label.
 */
export const getMonthOptions = (
  now: Date,
  count = 12,
): Array<{ label: string; value: string }> =>
  Array.from({ length: count }, (_, index) => {
    const date = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - index, 1),
    )
    return {
      value: date.toISOString().slice(0, 7),
      label: date.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
      }),
    }
  })
