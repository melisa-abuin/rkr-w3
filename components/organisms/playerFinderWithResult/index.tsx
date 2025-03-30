'use client'

import Link from '@/components/atoms/link'
import Columns from '@/components/molecules/columns'
import PlayerFinder from '@/components/molecules/playerFinder'
import { playerColumns } from '@/constants'
import { PlayerStats } from '@/interfaces/player'
import { useState } from 'react'

export default function PlayerFinderWithResult() {
  const [selectedPlayer, setSelectedPlayer] = useState<
    PlayerStats | undefined
  >()

  const handleClear = () => {
    setSelectedPlayer(undefined)
  }

  return (
    <>
      <PlayerFinder onPlayerSelect={setSelectedPlayer} onClear={handleClear} />
      {selectedPlayer && (
        <Columns
          actionColumn={
            <Link
              colorName="brandSecondary"
              href={`/player/${encodeURIComponent(selectedPlayer.battleTag.tag)}`}
              withButtonStyle
            >
              See player stats
            </Link>
          }
          data={[
            {
              columns: playerColumns.map((col) => ({
                description: col.title,
                value: selectedPlayer[col.key],
              })),
            },
          ]}
        />
      )}
    </>
  )
}
