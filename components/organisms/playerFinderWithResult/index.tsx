'use client'

import Button from '@/components/atoms/button'
import Columns from '@/components/molecules/columns'
import PlayerFinder from '@/components/molecules/playerFinder'
import { Player } from '@/interfaces/player'
import { useState } from 'react'
import styles from './index.module.css'

export const columns = [
  { title: 'Saves', key: 'saves' },
  { title: 'Deaths', key: 'deaths' },
  { title: 'S/D Ratio', key: 'saveDeathRatio' },
  { title: 'Win Rate', key: 'winRate' },
  { title: 'Highest Win Streak', key: 'highestWinStreak' },
] as const

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

  const activePlayer = selectedPlayer ?? player

  const handleSelect = (p: Player | undefined) => {
    setSelectedPlayer ? setSelectedPlayer(p) : setPlayer(p)
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
                columns: columns.map((col) => ({
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
