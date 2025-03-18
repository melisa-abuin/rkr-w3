'use client'

import React, { useState } from 'react'
import { PlayerStats } from '@/interfaces/player'
import PlayerFinder from '@/components/molecules/playerFinder'
import Columns from '@/components/molecules/columns'
import Link from '@/components/atoms/link'
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
              colorName="brandSecondary"
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
