/**
 * Provides a string with the time passed from a certain date
 * e.g. if the specified date is older than 30 days it returns 'One month ago'
 *
 * @param date date to compare with
 * @returns formated difference between today and date
 */
export const getTimeAgoFromToday = (date: string) => {
  if (!date) return ''

  const now = new Date()
  const datePlayed = new Date(date)
  const diffInMs = now.getTime() - datePlayed.getTime()

  const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  if (years > 1) return `${years} years ago`
  if (years === 1) return `1 year ago`

  if (months > 1) return `${months} months ago`
  if (months === 1) return `1 month ago`

  if (days > 1) return `${days} days ago`
  if (days === 1) return `1 day ago`

  return 'Today'
}
