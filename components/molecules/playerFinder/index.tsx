'use client'

import Input from '@/components/atoms/input'
import { Search } from '@/components/icons/search'
import { Player } from '@/interfaces/player'
import Image from 'next/image'
import { useRef, useState } from 'react'
import styles from './index.module.css'
import { useApiQuery } from '@/hooks/useApiQuery'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'
import { useQueryErrorToast } from '@/hooks/useQueryErrorToast'
import { useOutsideClick } from '@/hooks/useOutsideClick'

interface Props {
  defaultValue?: string
  onChange?: (value: string) => void
  onClear: () => void
  onPlayerSelect: (player: Player) => void
  placeholder?: string
}

export default function PlayerFinder({
  defaultValue = '',
  onChange,
  onClear,
  onPlayerSelect,
  placeholder = 'Search a player',
}: Props) {
  const [query, setQuery] = useState(defaultValue)
  const [selectedPlayer, setSelectedPlayer] = useState<Player>()
  const [showOptions, setShowOptions] = useState(false)

  const debouncedQuery = useDebouncedValue(query, 300)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const hasCustomOnChange = !!onChange

  useOutsideClick(() => setShowOptions(false), wrapperRef)

  const { data, isFetching, error } = useApiQuery<{ stats: Player[] }>(
    '/api/stats',
    debouncedQuery.length > 2 ? { battleTag: debouncedQuery } : undefined,
    {
      enabled:
        !hasCustomOnChange &&
        debouncedQuery.length > 2 &&
        query !== selectedPlayer?.battleTag.tag,
    },
  )

  useQueryErrorToast(error, `searching for "${debouncedQuery}"`)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (hasCustomOnChange) {
      onChange(e.target.value)
    } else {
      setShowOptions(true)
    }
    setQuery(e.target.value)
  }

  const handleSelect = (player: Player) => {
    setSelectedPlayer(player)
    setQuery(player.battleTag.tag)
    onPlayerSelect(player)
    setShowOptions(false)
  }

  const handleSearchClear = () => {
    setQuery('')
    setSelectedPlayer(undefined)
    onClear()
    setShowOptions(false)
  }

  const clickableOptionClassName = `${styles.option} ${styles.clickableOption}`

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <Input
        id="player"
        leftIcon={
          isFetching ? (
            <Image
              alt="loading"
              height={16}
              src="/loading-dark.gif"
              width={16}
            />
          ) : (
            <Search fill="currentColor" height={16} width={16} />
          )
        }
        name="player"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        onCrossClick={handleSearchClear}
        onFocus={() => setShowOptions(true)}
      />

      {showOptions && query.length > 2 && data && (
        <div className={styles.options}>
          {data.stats.length > 0 ? (
            data.stats.map((player) => (
              <span
                key={player.battleTag.tag}
                className={clickableOptionClassName}
                onClick={() => handleSelect(player)}
              >
                {player.battleTag.tag}
              </span>
            ))
          ) : (
            <span className={styles.option}>No results</span>
          )}
        </div>
      )}
    </div>
  )
}
