'use client'

import Button from '@/components/atoms/button'
import Columns from '@/components/molecules/columns'
import PlayerFinder from '@/components/molecules/playerFinder'
import { PlayerStats } from '@/interfaces/player'
import { useState } from 'react'
import { Wrapper } from './styled'

export const columns = [
  { title: 'Saves', key: 'saves' },
  { title: 'Deaths', key: 'deaths' },
  { title: 'S/D Ratio', key: 'saveDeathRatio' },
  { title: 'Win Rate', key: 'winRate' },
  { title: 'Highest Win Streak', key: 'winStreak' },
] as const

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
                columns: columns.map((col) => ({
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
