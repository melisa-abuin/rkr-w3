import { getTimeAgoFromToday } from '@/utils'
import React from 'react'

interface Props {
  data: string
}

export default function DatePlayed({ data }: Props) {
  return <div>{getTimeAgoFromToday(data)}</div>
}
