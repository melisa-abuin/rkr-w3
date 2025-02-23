'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Container, Input, Options, Option, Wrapper } from './styled'
import { PlayersStats, PlayerStats } from '@/interfaces/player'
import Columns from '../columns'
import Link from '../link'

export default function PlayerFinder() {
  const [query, setQuery] = useState('')
  const [filteredData, setFilteredData] = useState<PlayersStats | undefined>()
  const [selectedPlayer, setSelectedPlayer] = useState<
    PlayerStats | undefined
  >()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(
    async (searchTerm: string) => {
      if (
        searchTerm.length > 3 &&
        searchTerm !== selectedPlayer?.battleTag.tag
      ) {
        console.log(searchTerm, selectedPlayer)
        setLoading(true)
        setError(null)

        // TODO: create helper or what about react query?
        try {
          const response = await fetch('/api/stats', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ battleTag: searchTerm }),
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
    },
    [selectedPlayer],
  )

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchData(query)
    }, 300)

    return () => clearTimeout(handler)
  }, [query, fetchData])

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const onPlayerSelect = (player: PlayerStats) => {
    setSelectedPlayer(player)
    setFilteredData(undefined)
    setQuery(player.battleTag.tag)
  }

  return (
    <>
      <Container>
        <label htmlFor="player">Find Player</label>
        <Wrapper>
          <Input
            name="player"
            id="player"
            placeholder="Type player battle tag"
            onChange={onChange}
            value={query}
          />
          {filteredData && (
            <Options>
              {filteredData.length > 0 ? (
                filteredData.map((player) => (
                  <Option
                    key={player.battleTag.tag}
                    isClickable
                    onClick={() => onPlayerSelect(player)}
                  >
                    {player.battleTag.tag}
                  </Option>
                ))
              ) : (
                <Option>No results</Option>
              )}
            </Options>
          )}
        </Wrapper>
      </Container>
      {selectedPlayer && (
        <Columns
          actionColumn={
            <Link
              href={`/player/${encodeURIComponent(selectedPlayer.battleTag.tag)}`}
              withButtonStyle
            >
              See player stats
            </Link>
          }
          columns={[
            {
              title: 'Saves',
              value: selectedPlayer?.saves,
            },
            {
              title: 'Deaths',
              value: selectedPlayer?.deaths,
            },
            {
              title: 'S/D Ratio',
              value: selectedPlayer?.saveDeathRatio,
            },
            {
              title: 'Highest Save Streak',
              value: selectedPlayer?.saveStreak?.highestSaveStreak,
            },
            {
              title: 'Highest Win Streak',
              value: selectedPlayer?.highestWinStreak,
            },
          ]}
        />
      )}
    </>
  )
}
