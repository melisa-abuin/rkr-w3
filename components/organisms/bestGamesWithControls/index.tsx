'use client'

import styles from './index.module.css'
import { useState } from 'react'
import { Difficulty } from '@/interfaces/difficulty'
import { apiUrl, difficultyNames } from '@/constants'
import Cards from './components/cards'
import { GamesStats } from '@/interfaces/game'
import Badges from '@/components/molecules/badges'
import Table from '@/components/molecules/table'
import { useApiQuery } from '@/hooks/useApiQuery'
import { useQueryErrorToast } from '@/hooks/useQueryErrorToast'
import { bestGameTimesColumnsWithRender } from '@/constants/tableColumns'

export default function BestGamesWithControls() {
  const [difficultyFilter, setDifficultyFilter] = useState<
    Difficulty | undefined
  >()

  const { data, isFetching, error } = useApiQuery<GamesStats>(
    difficultyFilter
      ? `${apiUrl}/api/BestGameTimes/top?count=20&difficulty=${difficultyFilter}`
      : `${apiUrl}/api/BestGameTimes/top?count=20`,
    undefined,
    {
      enabled: true,
    },
  )

  useQueryErrorToast(
    error,
    `Couldn't load best game times for "${difficultyFilter}" difficulty, please try again later.`,
  )

  const onFilterClick = (difficulty: Difficulty | undefined) => {
    setDifficultyFilter(difficulty)
  }

  const columns = !!difficultyFilter
    ? bestGameTimesColumnsWithRender.filter(({ key }) => key !== 'difficulty')
    : bestGameTimesColumnsWithRender

  return (
    <>
      <div className={styles.badgesContainer}>
        <Badges
          options={difficultyNames}
          selected={difficultyFilter}
          onClick={onFilterClick}
        />
      </div>
      <Cards
        games={data?.slice(0, 5) || []}
        loading={isFetching}
        showDifficulty={!difficultyFilter}
      />
      <Table
        columns={columns}
        data={data?.slice(5, 20) || []}
        difficultyFilter={difficultyFilter}
        loading={isFetching}
      />
    </>
  )
}
