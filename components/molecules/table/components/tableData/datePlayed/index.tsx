import React from 'react'

interface Props {
  data: string
}

export const getDateToShow = (data: string) => {
  if (!data) return ''

  const now = new Date()
  const datePlayed = new Date(data)
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

export default function DatePlayed({ data }: Props) {
  return <div>{getDateToShow(data)}</div>
}
