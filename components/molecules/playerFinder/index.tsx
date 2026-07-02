'use client'

import Input from '@/components/atoms/input'
import { Search } from '@/components/icons/search'
import { playersApi } from '@/constants'
import { useApiQuery } from '@/hooks/useApiQuery'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import { useQueryErrorToast } from '@/hooks/useQueryErrorToast'
import { filterByBattleTag } from '@/utils/formatDataByQueryParams'
import Image from 'next/image'
import { useRef, useState } from 'react'
import styles from './index.module.css'

interface Props {
  defaultValue?: string
  onChange?: (value: string) => void
  onClear: () => void
  onPlayerSelect: (player: string) => void
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
  const [selectedPlayer, setSelectedPlayer] = useState('')
  const [showOptions, setShowOptions] = useState(false)

  const debouncedQuery = useDebouncedValue(query, 300)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const hasCustomOnChange = !!onChange

  useOutsideClick(() => setShowOptions(false), wrapperRef)

  const { data, isFetching, error } = useApiQuery<Array<{ battleTag: string }>>(
    playersApi,
    debouncedQuery.length > 2 ? { battleTag: debouncedQuery } : undefined,
    {
      enabled:
        !hasCustomOnChange &&
        debouncedQuery.length > 2 &&
        query !== selectedPlayer,
    },
  )

  const filteredData = data ? filterByBattleTag(data, debouncedQuery) : []

  useQueryErrorToast(error, `searching for "${debouncedQuery}"`)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (hasCustomOnChange) {
      onChange(e.target.value)
    } else {
      setShowOptions(true)
    }
    setQuery(e.target.value)
  }

  const handleSelect = (player: string) => {
    setSelectedPlayer(player)
    setQuery(player)
    onPlayerSelect(player)
    setShowOptions(false)
  }

  const handleSearchClear = () => {
    setQuery('')
    setSelectedPlayer('')
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
          {filteredData.length > 0 ? (
            filteredData.map((player) => (
              <span
                key={player.battleTag}
                className={clickableOptionClassName}
                onClick={() => handleSelect(player.battleTag)}
              >
                {player.battleTag}
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
