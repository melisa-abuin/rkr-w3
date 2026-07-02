'use client'

import Button from '@/components/atoms/button'
import Columns from '@/components/molecules/columns'
import PlayerFinder from '@/components/molecules/playerFinder'
import { playersSummaryApi } from '@/constants'
import { playerFinderColumns } from '@/constants/tableColumns'
import { useApiQuery } from '@/hooks/useApiQuery'
import { Player } from '@/interfaces/player'
import { useEffect, useState } from 'react'
import styles from './index.module.css'

interface Props {
  selectedPlayer?: Player
  setSelectedPlayer?: (player: Player | undefined) => void
  placeholder?: string
}

export default function PlayerFinderWithResult({
  selectedPlayer,
  setSelectedPlayer,
  placeholder,
}: Props) {
  const [player, setPlayer] = useState<Player | undefined>(selectedPlayer)
  const [battleTag, setBattleTag] = useState<string | undefined>()

  const { data } = useApiQuery<Array<Player>>(
    `${playersSummaryApi}?battleTag=${encodeURIComponent(battleTag ?? '')}`,
    undefined,
    { enabled: !!battleTag },
  )

  useEffect(() => {
    const player = data?.[0]

    if (!player) return

    setSelectedPlayer?.(player)
    setPlayer(player)
    setBattleTag(undefined)
  }, [data, setSelectedPlayer, setPlayer])

  const handleClear = () => {
    setBattleTag(undefined)
    setPlayer(undefined)
    setSelectedPlayer?.(undefined)
  }

  return (
    <>
      <PlayerFinder
        placeholder={placeholder}
        onClear={handleClear}
        onPlayerSelect={setBattleTag}
      />
      {player && (
        <div className={styles.wrapper}>
          <Columns
            actionColumn={
              <Button
                as="a"
                colorName="secondary"
                href={`/player/${encodeURIComponent(player.battleTag.tag)}`}
                variant="outline"
              >
                See player stats
              </Button>
            }
            data={[
              {
                columns: playerFinderColumns.map((col) => ({
                  description: col.title,
                  value: player[col.key],
                })),
              },
            ]}
          />
        </div>
      )}
    </>
  )
}
