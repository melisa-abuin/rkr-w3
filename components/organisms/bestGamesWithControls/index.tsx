'use client'

import { BadgesContainer } from './styled'
import { useState, useEffect } from 'react'
import { Difficulty } from '@/interfaces/difficulty'
import { difficultyNames } from '@/constants'
import BestGames from '@/components/molecules/bestGames'
import { GamesStats } from '@/interfaces/game'
import Badges from '@/components/molecules/badges'

export default function BestGamesWithControls() {
  const [difficultyFilter, setDifficultyFilter] = useState<
    Difficulty | undefined
  >()
  const [filteredData, setFilteredData] = useState<GamesStats | undefined>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFilteredData = async () => {
      setLoading(true)
      setError(null)

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
        setError((error as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchFilteredData()
  }, [difficultyFilter])

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
      {error ? (
        <div>Error: {error}</div>
      ) : (
        <BestGames
          games={filteredData || []}
          loading={loading}
          showDifficulty={!difficultyFilter}
        />
      )}
    </>
  )
}
