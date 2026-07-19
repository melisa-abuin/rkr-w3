'use client'

import PageContainer from '@/components/atoms/pageContainer'
import Badges from '@/components/molecules/badges'
import ColumnCards from '@/components/molecules/columnCards'
import { playersTimeLeaderboardApi, roundDifficultyNames } from '@/constants'
import { useApiQuery } from '@/hooks/useApiQuery'
import { useQueryErrorToast } from '@/hooks/useQueryErrorToast'
import { Difficulty } from '@/interfaces/difficulty'
import { LeaderboardCategories } from '@/interfaces/leaderboard'
import { useState } from 'react'
import styles from './index.module.css'

type LeaderBoardData = LeaderboardCategories[]

interface ColumnCardsWithControlsProps {
  data?: LeaderBoardData
  title: string
  filter: 'stats' | 'times'
  selectedPlayer?: string
}

export default function ColumnCardsWithControls({
  data,
  filter,
  title,
  selectedPlayer,
}: ColumnCardsWithControlsProps) {
  const [difficultyFilter, setDifficultyFilter] = useState<
    Difficulty | undefined
  >()

  const {
    data: filteredData,
    isFetching,
    error,
  } = useApiQuery<LeaderBoardData>(
    `${playersTimeLeaderboardApi}?difficulty=${difficultyFilter}`,
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

  return (
    <PageContainer
      ariaLabelledby="columns-time-title"
      marginTop={32}
      title={title}
      withPadding={false}
    >
      <div className={styles.badgesContainer}>
        <Badges
          options={roundDifficultyNames}
          selected={difficultyFilter}
          onClick={onFilterClick}
        />
      </div>
      <ColumnCards
        data={difficultyFilter === undefined ? data : filteredData}
        difficulty={difficultyFilter}
        filter={filter}
        hoverable={difficultyFilter === undefined}
        loading={isFetching}
        selectedPlayer={selectedPlayer}
        sortOrder="asc"
      />
    </PageContainer>
  )
}
