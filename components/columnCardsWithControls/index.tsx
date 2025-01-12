'use client'

import { BestTime } from '@/interfaces/player'
import ColumnCards from '../columnCards'
import { PageContainer } from '../pageContainer'
import { Badges } from '../badges'
import { BadgesContainer } from './styled'
import { useFetch } from '@/hooks/useFetch'
import { useCallback, useState } from 'react'
import { Difficulty } from '@/interfaces/difficulty'

interface Data {
  player: string
  data: number | BestTime
}

interface Props {
  data?: { category: string; data: Data[]; key: string }[]
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
    data: fiteredData,
    error,
    loading,
  } = useFetch<Array<{ category: string; key: string; data: Data[] }>>(
    '/api/timeLeaderboard',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ difficulty: difficultyFilter }),
    },
    [difficultyFilter],
  )

  const onFilterClick = (difficulty: Difficulty | undefined) => {
    setDifficultyFilter(difficulty)
  }

  console.log(fiteredData)
  return (
    <PageContainer
      ariaLabelledby="columns-time-title"
      marginTop={32}
      title={title}
    >
      <BadgesContainer>
        <Badges
          onClick={onFilterClick}
          options={['normal', 'hard', 'impossible', 'all']}
          selected={difficultyFilter}
        />
      </BadgesContainer>

      <ColumnCards data={data} viewAllKey={viewAllKey} />
    </PageContainer>
  )
}
