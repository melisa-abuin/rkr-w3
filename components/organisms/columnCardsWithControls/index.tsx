'use client'

import { useState } from 'react'
import { Difficulty } from '@/interfaces/difficulty'
import { roundDifficultyNames } from '@/constants'
import { PageContainer } from '@/components/atoms/pageContainer'
import Badges from '@/components/molecules/badges'
import ColumnCards from '@/components/molecules/columnCards'
import { LeaderboardCategories } from '@/interfaces/leaderboard'
import { useApiQuery } from '@/hooks/useApiQuery'
import { useQueryErrorToast } from '@/hooks/useQueryErrorToast'
import styles from './index.module.css'

type LeaderBoardData = LeaderboardCategories[]

interface Props {
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
}: Props) {
  const [difficultyFilter, setDifficultyFilter] = useState<
    Difficulty | undefined
  >()

  const {
    data: filteredData,
    isFetching,
    error,
  } = useApiQuery<LeaderBoardData>(
    `/api/timeLeaderboard?difficulty=${difficultyFilter}`,
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
      />
    </PageContainer>
  )
}
