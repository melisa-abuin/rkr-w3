'use client'

import Button from '@/components/atoms/button'
import Columns from '@/components/molecules/columns'
import PlayerFinder from '@/components/molecules/playerFinder'
import { playerFinderColumns } from '@/constants/tableColumns'
import { useApiQuery } from '@/hooks/useApiQuery'
import { Player } from '@/interfaces/player'
import { useEffect, useState } from 'react'
import styles from './index.module.css'

export default function PlayerFinderWithResult({
  selectedPlayer,
  setSelectedPlayer,
  onClear,
}: {
  selectedPlayer?: Player
  setSelectedPlayer?: (player: Player | undefined) => void
  onClear?: () => void
}) {
  const [player, setPlayer] = useState<Player | undefined>(selectedPlayer)
  const [pendingBattleTag, setPendingBattleTag] = useState<string | undefined>()

  const activePlayer = selectedPlayer ?? player

  const { data: fetchedPlayer } = useApiQuery<Player>(
    `/api/player/${encodeURIComponent(pendingBattleTag ?? '')}`,
    undefined,
    { enabled: !!pendingBattleTag },
  )

  useEffect(() => {
    if (!fetchedPlayer) return
    setSelectedPlayer
      ? setSelectedPlayer(fetchedPlayer)
      : setPlayer(fetchedPlayer)
    setPendingBattleTag(undefined)
  }, [fetchedPlayer, setSelectedPlayer])

  const handleSelect = (battleTag: string) => {
    setPendingBattleTag(battleTag)
  }

  const handleClear = () => {
    onClear ? onClear() : setPlayer(undefined)
  }

  return (
    <>
      <PlayerFinder onClear={handleClear} onPlayerSelect={handleSelect} />
      {activePlayer && (
        <div className={styles.wrapper}>
          <Columns
            actionColumn={
              <Button
                as="a"
                colorName="secondary"
                href={`/player/${encodeURIComponent(activePlayer.battleTag.tag)}`}
                variant="outline"
              >
                See player stats
              </Button>
            }
            data={[
              {
                columns: playerFinderColumns.map((col) => ({
                  description: col.title,
                  value: activePlayer[col.key],
                })),
              },
            ]}
          />
        </div>
      )}
    </>
  )
}
