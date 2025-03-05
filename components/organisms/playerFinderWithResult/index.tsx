'use client'

import React, { useState } from 'react'
import { PlayerStats } from '@/interfaces/player'
import PlayerFinder from '@/components/playerFinder'
import Columns from '@/components/columns'
import Link from '@/components/link'
import { playerColumns } from '@/constants'

export default function PlayerFinderWithResult() {
  const [selectedPlayer, setSelectedPlayer] = useState<
    PlayerStats | undefined
  >()

  return (
    <>
      <PlayerFinder onPlayerSelect={setSelectedPlayer} />
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
          columns={playerColumns.map((col) => ({
            description: col.title,
            value: selectedPlayer[col.key],
          }))}
        />
      )}
    </>
  )
}
