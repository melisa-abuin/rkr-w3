'use client'

import Button from '@/components/atoms/button'
import Columns from '@/components/molecules/columns'
import PlayerFinder from '@/components/molecules/playerFinder'
import { playerColumns } from '@/constants'
import { PlayerStats } from '@/interfaces/player'
import { useState } from 'react'
import { Wrapper } from './styled'

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
        <Wrapper>
          <Columns
            actionColumn={
              <Button
                as="a"
                variant="outline"
                colorName="secondary"
                href={`/player/${encodeURIComponent(selectedPlayer.battleTag.tag)}`}
              >
                See player stats
              </Button>
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
        </Wrapper>
      )}
    </>
  )
}
