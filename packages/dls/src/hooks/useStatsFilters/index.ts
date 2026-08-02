import { useDebouncedValue } from '@/hooks/useDebouncedValue'
import { useStatsSearchParams } from '@/hooks/useStatsSearchParams'
import { Difficulty } from '@/interfaces/difficulty'
import { Dispatch, SetStateAction, useState } from 'react'

export interface SortingKey {
  key: string
  asc: boolean
}

export interface StatsFilters {
  currentApiUrl: string
  setCurrentApiUrl: Dispatch<SetStateAction<string>>
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
  currentSeason: string
  setCurrentSeason: Dispatch<SetStateAction<string>>
  difficultyFilter: Difficulty | undefined
  setDifficultyFilter: Dispatch<SetStateAction<Difficulty | undefined>>
  sortKey: SortingKey
  setSortKey: Dispatch<SetStateAction<SortingKey>>
  player: string
  setPlayer: Dispatch<SetStateAction<string>>
  debouncedQuery: string
}

export const useStatsFilters = (): StatsFilters => {
  const {
    initialApi,
    initialPage,
    initialSeason,
    initialFilter,
    initialSortKey,
    initialSortOrder,
    initialPlayer,
  } = useStatsSearchParams()

  const [currentApiUrl, setCurrentApiUrl] = useState<string>(initialApi)
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [currentSeason, setCurrentSeason] = useState(initialSeason)
  const [difficultyFilter, setDifficultyFilter] = useState<
    Difficulty | undefined
  >(initialFilter)
  const [sortKey, setSortKey] = useState<SortingKey>({
    key: initialSortKey,
    asc: initialSortOrder,
  })
  const [player, setPlayer] = useState<string>(initialPlayer)
  const debouncedQuery = useDebouncedValue(player, 300)

  return {
    currentApiUrl,
    setCurrentApiUrl,
    currentPage,
    setCurrentPage,
    currentSeason,
    setCurrentSeason,
    difficultyFilter,
    setDifficultyFilter,
    sortKey,
    setSortKey,
    player,
    setPlayer,
    debouncedQuery,
  }
}
