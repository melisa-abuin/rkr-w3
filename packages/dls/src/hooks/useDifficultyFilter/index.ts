import { useApiQuery } from '@/hooks/useApiQuery'
import { useQueryErrorToast } from '@/hooks/useQueryErrorToast'
import { Difficulty } from '@/interfaces/difficulty'
import { useState } from 'react'

export function useDifficultyFilter<TData>(baseUrl: string) {
  const [difficultyFilter, setDifficultyFilter] = useState<
    Difficulty | undefined
  >()

  const {
    data: filteredData,
    isFetching,
    error,
  } = useApiQuery<TData>(
    `${baseUrl}?difficulty=${difficultyFilter}`,
    undefined,
    {
      enabled: !!difficultyFilter,
    },
  )

  useQueryErrorToast(
    error,
    `Couldn't fetch the times leaderboard for the ${difficultyFilter} difficulty, please try again later.`,
  )

  const onFilterClick = (difficulty: Difficulty | undefined) => {
    setDifficultyFilter(difficulty)
  }

  return { difficultyFilter, filteredData, isFetching, onFilterClick }
}
