'use client'

import { BadgesContainer } from './styled'
import { useState, useEffect } from 'react'
import { RoundDifficulty } from '@/interfaces/difficulty'
import { roundDifficultyNames } from '@/constants'
import { PageContainer } from '@/components/atoms/pageContainer'
import Badges from '@/components/molecules/badges'
import ColumnCards from '@/components/molecules/columnCards'
import { useToast } from '@/hooks/useToast'
import { LeaderboardCategories } from '@/interfaces/leaderboard'

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
    RoundDifficulty | undefined
  >()
  const [filteredData, setFilteredData] = useState<
    LeaderBoardData | undefined
  >()
  const [loading, setLoading] = useState(false)
  const { showToast } = useToast()

  useEffect(() => {
    const fetchFilteredData = async () => {
      if (difficultyFilter === undefined) {
        setFilteredData(data)
        return
      }

      setLoading(true)

      // TODO: create helper or what about react query?
      try {
        const response = await fetch(
          `/api/timeLeaderboard?difficulty=${difficultyFilter}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const result = await response.json()
        setFilteredData(result)
      } catch (error) {
        showToast(
          `Couldn't fetch the times leaderboard for the ${difficultyFilter} difficulty, please try again later.`,
        )
      } finally {
        setLoading(false)
      }
    }

    fetchFilteredData()
  }, [difficultyFilter, data, showToast])

  const onFilterClick = (difficulty: RoundDifficulty | undefined) => {
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
        loading={loading}
        viewAllKey={viewAllKey}
      />
    </PageContainer>
  )
}
