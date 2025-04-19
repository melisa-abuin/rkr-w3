'use client'

import { BadgesContainer } from './styled'
import { useState, useEffect } from 'react'
import { Difficulty } from '@/interfaces/difficulty'
import { bestGameTimesColumns, difficultyNames } from '@/constants'
import BestGames from '@/components/molecules/bestGames'
import { GamesStats } from '@/interfaces/game'
import Badges from '@/components/molecules/badges'
import { useToast } from '@/hooks/useToast'
import Table from '@/components/molecules/table'

export default function BestGamesWithControls() {
  const [difficultyFilter, setDifficultyFilter] = useState<
    Difficulty | undefined
  >()
  const [filteredData, setFilteredData] = useState<GamesStats | undefined>()
  const [loading, setLoading] = useState(true)
  const { showToast } = useToast()

  useEffect(() => {
    const fetchFilteredData = async () => {
      setLoading(true)

      // TODO: create helper or what about react query?
      try {
        const response = await fetch(
          difficultyFilter
            ? `/api/gameTimes?difficulty=${difficultyFilter}`
            : '/api/gameTimes',
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
          `Couldn't load best game times for "${difficultyFilter}" difficulty, please try again later.`,
        )
      } finally {
        setLoading(false)
      }
    }

    fetchFilteredData()
  }, [difficultyFilter, showToast])

  const onFilterClick = (difficulty: Difficulty | undefined) => {
    setDifficultyFilter(difficulty)
  }

  return (
    <>
      <BadgesContainer>
        <Badges
          onClick={onFilterClick}
          options={difficultyNames}
          selected={difficultyFilter}
        />
      </BadgesContainer>
      <BestGames
        games={filteredData?.slice(0, 5) || []}
        loading={loading}
        showDifficulty={!difficultyFilter}
      />
      <Table
        columns={bestGameTimesColumns}
        data={filteredData?.slice(6, 20) || []}
        loading={loading}
      />
    </>
  )
}
