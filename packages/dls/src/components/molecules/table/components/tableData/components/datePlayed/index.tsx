import { getTimeAgoFromToday } from '@/utils'

interface DatePlayedProps {
  data: string
}

export default function DatePlayed({ data }: DatePlayedProps) {
  return <div>{getTimeAgoFromToday(data)}</div>
}
