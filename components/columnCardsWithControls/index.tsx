'use client'

import { BestTime } from '@/interfaces/player'
import ColumnCards from '../columnCards'
import { PageContainer } from '../atoms/pageContainer'
import Badges from '../atoms/badges'
import { BadgesContainer } from './styled'
import { useState, useEffect } from 'react'
import { Difficulty } from '@/interfaces/difficulty'

interface Data {
  player: string
  data: number | BestTime
}

type LeaderBoardData = { category: string; data: Data[]; key: string }[]

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
  const [filteredData, setFilteredData] = useState<
    LeaderBoardData | undefined
  >()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFilteredData = async () => {
      if (difficultyFilter === undefined) {
        setFilteredData(data)
        return
      }

      setLoading(true)
      setError(null)

      // TODO: create helper or what about react query?
      try {
        const response = await fetch('/api/timeLeaderboard', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ difficulty: difficultyFilter }),
        })

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const result = await response.json()
        setFilteredData(result)
      } catch (error) {
        setError((error as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchFilteredData()
  }, [difficultyFilter, data])

  const onFilterClick = (difficulty: Difficulty | undefined) => {
    setDifficultyFilter(difficulty)
  }

  return (
    <PageContainer
      ariaLabelledby="columns-time-title"
      marginTop={32}
      title={title}
    >
      <BadgesContainer>
        <Badges
          onClick={onFilterClick}
          options={['normal', 'hard', 'impossible']}
          selected={difficultyFilter}
        />
      </BadgesContainer>
      {error ? (
        <div>Error: {error}</div>
      ) : (
        <ColumnCards
          data={difficultyFilter === undefined ? data : filteredData}
          hoverable={difficultyFilter === undefined}
          loading={loading}
          viewAllKey={viewAllKey}
        />
      )}
    </PageContainer>
  )
}
