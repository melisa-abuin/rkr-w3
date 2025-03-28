'use client'

import Input from '@/components/atoms/input'
import { Search } from '@/components/icons/search'
import { useTheme } from '@/hooks/useTheme'
import { PlayersStats, PlayerStats } from '@/interfaces/player'
import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import { Option, Options, Wrapper } from './styled'

interface Props {
  onPlayerSelect: (player: PlayerStats) => void
  onClear: () => void
  placeholder?: string
  defaultValue?: string
}

export default function PlayerFinder({
  onPlayerSelect,
  onClear,
  placeholder = 'Search a player',
  defaultValue = '',
}: Props) {
  const [query, setQuery] = useState(defaultValue)
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
          const response = await fetch(`/api/stats?battleTag=${searchTerm}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
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
    if (query !== defaultValue || !defaultValue) {
      const handler = setTimeout(() => {
        fetchData(query)
      }, 300)

      return () => clearTimeout(handler)
    }
  }, [query, fetchData, defaultValue])

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
    setSelectedPlayer(undefined)
    onClear()
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
