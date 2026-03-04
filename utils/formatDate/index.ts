/**
 * Formats a date string into a localized date.
 *
 * Returns an empty string when no date is provided.
 *
 * @param date - Date value as a string.
 * @param withoutDay - When true, returns only month and year.
 * @returns English date string with numeric year and long month, optionally with numeric day, or an empty string.
 */
export const formatDateToLocale = (date: string, withoutDay = false) => {
  if (!date) return ''
  const lastDate = new Date(date)

  const formatOptions: Intl.DateTimeFormatOptions = withoutDay
    ? {
        year: 'numeric',
        month: 'long',
      }
    : {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }

  return lastDate.toLocaleDateString('en-US', {
    ...formatOptions,
  })
}
