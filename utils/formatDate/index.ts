export const formatDateToLocale = (date: string) => {
  if (!date) return ''
  const lastDate = new Date(date)
  return lastDate.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
