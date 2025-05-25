'use client'

import Input from '@/components/atoms/input'
import { Search } from '@/components/icons/search'
import { useTheme } from '@/hooks/useTheme'
import { PlayersStats, PlayerStats } from '@/interfaces/player'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { Option, Options, Wrapper } from './styled'
import { useApiQuery } from '@/hooks/useApiQuery'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'
import { useQueryErrorToast } from '@/hooks/useQueryErrorToast'
import { useOutsideClick } from '@/hooks/useOutsideClick'

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
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerStats>()
  const [showOptions, setShowOptions] = useState(false)

  const debouncedQuery = useDebouncedValue(query, 300)
  const [theme] = useTheme()
  const wrapperRef = useRef<HTMLDivElement>(null)

  useOutsideClick(() => setShowOptions(false), wrapperRef)

  const { data, isFetching, refetch, error } = useApiQuery<PlayersStats>(
    '/api/stats',
    debouncedQuery ? { battleTag: debouncedQuery } : undefined,
    {
      enabled: false,
    },
  )

  useQueryErrorToast(error, `searching for "${debouncedQuery}"`)

  useEffect(() => {
    if (debouncedQuery && debouncedQuery !== selectedPlayer?.battleTag.tag) {
      refetch()
    }
  }, [debouncedQuery, refetch, selectedPlayer?.battleTag.tag])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setShowOptions(true)
  }

  const onSelect = (player: PlayerStats) => {
    setSelectedPlayer(player)
    setQuery(player.battleTag.tag)
    onPlayerSelect(player)
    setShowOptions(false)
  }

  const onSearchClear = () => {
    setQuery('')
    setSelectedPlayer(undefined)
    onClear()
    setShowOptions(false)
  }

  return (
    <Wrapper ref={wrapperRef}>
      <Input
        id="player"
        leftIcon={
          isFetching ? (
            <Image
              alt="loading"
              height={16}
              src={`/loading-${theme.name}.gif`}
              width={16}
            />
          ) : (
            <Search height={16} fill={theme.text.color.primary} width={16} />
          )
        }
        name="player"
        onChange={onChange}
        onCrossClick={onSearchClear}
        onFocus={() => setShowOptions(true)}
        placeholder={placeholder}
        value={query}
      />

      {showOptions && data && (
        <Options>
          {data.length > 0 ? (
            data.map((player) => (
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
    </Wrapper>
  )
}
