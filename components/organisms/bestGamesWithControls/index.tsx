'use client'

import { BadgesContainer } from './styled'
import { useState, useEffect } from 'react'
import { Difficulty } from '@/interfaces/difficulty'
import { difficultyNames } from '@/constants'
import BestGames from '@/components/molecules/bestGames'
import { GamesStats } from '@/interfaces/game'
import Badges from '@/components/molecules/badges'

interface Props {
  data: GamesStats
}
export default function BestGamesWithControls({ data }: Props) {
  const [difficultyFilter, setDifficultyFilter] = useState<
    Difficulty | undefined
  >()
  const [filteredData, setFilteredData] = useState<GamesStats | undefined>()
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
        const response = await fetch('/api/gameTimes', {
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
          games={difficultyFilter && filteredData ? filteredData : data}
          loading={loading}
          showDifficulty={!difficultyFilter}
        />
      )}
    </>
  )
}
