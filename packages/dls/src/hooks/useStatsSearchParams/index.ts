import { Difficulty } from '@/interfaces/difficulty'
import { useSearchParams } from 'next/navigation'

export interface StatsSearchParams {
  initialSeason: string
  initialPage: number
  initialApi: string
  initialFilter: Difficulty | undefined
  initialSortKey: string
  initialSortOrder: boolean
  initialPlayer: string
}

export const useStatsSearchParams = (): StatsSearchParams => {
  const searchParams = useSearchParams()

  return {
    initialSeason: searchParams?.get('season') || '',
    initialPage: parseInt(searchParams?.get('page') || '1', 10),
    initialApi: searchParams?.get('filter') || 'stats',
    initialFilter: (searchParams?.get('difficulty') as Difficulty) || undefined,
    initialSortKey: searchParams?.get('sortKey') || '',
    initialSortOrder: searchParams?.get('sortOrder') === 'asc',
    initialPlayer: searchParams?.get('battleTag') || '',
  }
}
