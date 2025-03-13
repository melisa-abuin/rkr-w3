'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Options, Option, Wrapper } from './styled'
import { PlayersStats, PlayerStats } from '@/interfaces/player'
import { useTheme } from '@/hooks/useTheme'
import Image from 'next/image'
import Input from '@/components/atoms/input'
import { Search } from '@/components/icons/search'

interface Props {
  onPlayerSelect: (player: PlayerStats) => void
  placeholder?: string
}

export default function PlayerFinder({
  onPlayerSelect,
  placeholder = 'Search a player',
}: Props) {
  const [query, setQuery] = useState('')
  const [filteredData, setFilteredData] = useState<PlayersStats | undefined>()
  const [selectedPlayer, setSelectedPlayer] = useState<
    PlayerStats | undefined
  >()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [theme] = useTheme()

  const fetchData = useCallback(
    async (searchTerm: string) => {
      if (
        searchTerm.length >= 3 &&
        searchTerm !== selectedPlayer?.battleTag.tag
      ) {
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
          setFilteredData(undefined)
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

  const onSelect = (player: PlayerStats) => {
    setSelectedPlayer(player)
    setFilteredData(undefined)
    setQuery(player.battleTag.tag)
    onPlayerSelect(player)
  }

  const onSearchClear = () => {
    setQuery('')
    setFilteredData(undefined)
  }

  return (
    <Wrapper>
      <Input
        id="player"
        leftIcon={
          loading ? (
            <Image
              alt="loading"
              height={16}
              src={`/loading-${theme.name}.gif`}
              width={16}
            />
          ) : (
            <Search height={16} fill={theme.text.primary} width={16} />
          )
        }
        name="player"
        onChange={onChange}
        onCrossClick={onSearchClear}
        placeholder={placeholder}
        value={query}
      />

      {filteredData && !loading && (
        <Options>
          {filteredData.length > 0 ? (
            filteredData.map((player) => (
              <Option
                key={player.battleTag.tag}
                isClickable
                onClick={() => onSelect(player)}
              >
                {player.battleTag.tag}
              </Option>
            ))
          ) : (
            <Option>No results</Option>
          )}
        </Options>
      )}

      {error && !loading && (
        <Options>
          <Option>Something went wrong</Option>
        </Options>
      )}
    </Wrapper>
  )
}
