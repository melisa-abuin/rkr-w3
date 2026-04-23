'use client'

import styles from './index.module.css'
import { useState } from 'react'
import { Difficulty } from '@/interfaces/difficulty'
import { bestGameTimesColumns, difficultyNames } from '@/constants'
import Cards from './components/cards'
import { GamesStats } from '@/interfaces/game'
import Badges from '@/components/molecules/badges'
import Table from '@/components/molecules/table'
import { useApiQuery } from '@/hooks/useApiQuery'
import { useQueryErrorToast } from '@/hooks/useQueryErrorToast'

export default function BestGamesWithControls() {
  const [difficultyFilter, setDifficultyFilter] = useState<
    Difficulty | undefined
  >()

  const { data, isFetching, error } = useApiQuery<GamesStats>(
    difficultyFilter
      ? `/api/gameTimes?difficulty=${difficultyFilter}`
      : '/api/gameTimes',
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
        columns={
          !!difficultyFilter
            ? bestGameTimesColumns.filter(({ key }) => key !== 'difficulty')
            : bestGameTimesColumns
        }
        data={
          data
            ?.slice(5, 20)
            .map((elem) => ({ ...elem, times: elem.times.total })) || []
        }
        difficultyFilter={difficultyFilter}
        loading={isFetching}
      />
    </>
  )
}
