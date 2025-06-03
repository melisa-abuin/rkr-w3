'use client'

import { BadgesContainer } from './styled'
import { useState } from 'react'
import { Difficulty } from '@/interfaces/difficulty'
import { roundDifficultyNames } from '@/constants'
import { PageContainer } from '@/components/atoms/pageContainer'
import Badges from '@/components/molecules/badges'
import ColumnCards from '@/components/molecules/columnCards'
import { LeaderboardCategories } from '@/interfaces/leaderboard'
import { useApiQuery } from '@/hooks/useApiQuery'
import { useQueryErrorToast } from '@/hooks/useQueryErrorToast'

type LeaderBoardData = LeaderboardCategories[]

interface Props {
  data?: LeaderBoardData
  title: string
  viewAllKey: 'overview' | 'time'
}

export default function ColumnCardsWithControls({
  data,
  viewAllKey,
  title,
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
      withPadding={false}
      title={title}
    >
      <BadgesContainer>
        <Badges
          onClick={onFilterClick}
          options={roundDifficultyNames}
          selected={difficultyFilter}
        />
      </BadgesContainer>
      <ColumnCards
        data={difficultyFilter === undefined ? data : filteredData}
        difficulty={difficultyFilter}
        hoverable={difficultyFilter === undefined}
        loading={isFetching}
        viewAllKey={viewAllKey}
      />
    </PageContainer>
  )
}
