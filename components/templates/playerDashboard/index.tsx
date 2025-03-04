'use client'

import { PageContainer } from '@/components/atoms/pageContainer'
import Awards from '@/components/awards'
import Columns from '@/components/columns'
import PageHeader from '@/components/pageHeader'
import PlayerFinder from '@/components/playerFinder'
import { difficultyNames, playerColumns, roundNames } from '@/constants'
import { DetailedPlayerStats, PlayerStats } from '@/interfaces/player'
import { formatKeyToWord } from '@/utils/formatKeyToWord'
import { secondsToSexagesimal } from '@/utils/secondsToSexagesimal'
import { useCallback, useState } from 'react'
import { getSortConditionByKey } from '@/utils/getSortConditionByKey'

export default function PlayerDashboard({
  playerData,
}: {
  playerData: DetailedPlayerStats
}) {
  const { awards, battleTag, skins } = playerData
  const [selectedPlayer, setSelectedPlayer] = useState<
    DetailedPlayerStats | undefined
  >()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async (player: PlayerStats) => {
    // TODO: create helper or what about react query?
    try {
      const response = await fetch('/api/player', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          battleTag: encodeURIComponent(player.battleTag.tag),
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const result = await response.json()
      setSelectedPlayer(result)
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setLoading(false)
    }
  }, [])

  //TODO: handle these cases
  console.log(loading)
  console.log(error)

  return (
    <>
      <PageContainer>
        <PageHeader
          align="flex-start"
          description={formatKeyToWord(skins?.selectedSkin)}
          title={
            selectedPlayer
              ? `${battleTag.name} vs ${selectedPlayer.battleTag.name}`
              : battleTag.name
          }
        />
        <PlayerFinder onPlayerSelect={fetchData} />
      </PageContainer>
      <PageContainer title="Overall Stats">
        <Columns
          columns={playerColumns.map((col) => ({
            description: col.title,
            value: playerData[col.key],
            compareValue: selectedPlayer?.[col.key] || undefined,
            isBetter:
              selectedPlayer &&
              getSortConditionByKey(col.key, playerData, selectedPlayer),
          }))}
        />
      </PageContainer>
      <PageContainer title="Game Awards" marginTop={24} marginBottom={24}>
        <Awards awards={awards} />
      </PageContainer>
      {difficultyNames.map((difficulty) => (
        <PageContainer
          key={difficulty}
          title={`Best ${difficulty} Times`}
          marginBottom={24}
        >
          <Columns
            columns={roundNames.map((round) => ({
              description: `Round ${round}`,
              value: secondsToSexagesimal(
                playerData?.[`round${round}`][difficulty] || 0,
              ),
              compareValue: selectedPlayer
                ? secondsToSexagesimal(
                    selectedPlayer?.[`round${round}`][difficulty] || 0,
                  )
                : undefined,
              isBetter:
                selectedPlayer &&
                getSortConditionByKey(
                  `round${round}`,
                  playerData,
                  selectedPlayer,
                  difficulty,
                ),
            }))}
          />
        </PageContainer>
      ))}
    </>
  )
}
