'use client'

import PageContainer from '@/components/atoms/pageContainer'
import Badges from '@/components/molecules/badges'
import ColumnCards from '@/components/molecules/columnCards'
import { roundDifficultyNames } from '@/constants'
import { Difficulty } from '@/interfaces/difficulty'
import { LeaderboardCategories } from '@/interfaces/leaderboard'
import styles from './index.module.css'

type LeaderBoardData = LeaderboardCategories[]

interface ColumnCardsWithControlsProps {
  data?: LeaderBoardData
  title: string
  filter: 'stats' | 'times'
  selectedPlayer?: string
  filteredData?: LeaderBoardData
  isFetching: boolean
  difficultyFilter: Difficulty | undefined
  onFilterClick: (difficulty: Difficulty | undefined) => void
}

export default function ColumnCardsWithControls({
  data,
  filter,
  title,
  selectedPlayer,
  filteredData,
  isFetching,
  difficultyFilter,
  onFilterClick,
}: ColumnCardsWithControlsProps) {
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
