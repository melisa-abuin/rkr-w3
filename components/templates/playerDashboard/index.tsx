'use client'

import { PageContainer } from '@/components/atoms/pageContainer'
import Awards from '@/components/awards'
import Columns from '@/components/columns'
import PageHeader from '@/components/pageHeader'
import PlayerFinder from '@/components/playerFinder'
import { difficultyNames, roundNames } from '@/constants'
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
          columns={[
            {
              description: 'Saves',
              value: playerData?.saves,
              compareValue: selectedPlayer?.saves || undefined,
              isBetter:
                selectedPlayer &&
                getSortConditionByKey('saves', playerData, selectedPlayer),
            },
            {
              description: 'Deaths',
              isBetter:
                selectedPlayer &&
                getSortConditionByKey('deaths', playerData, selectedPlayer),
              value: playerData?.deaths,
              compareValue: selectedPlayer?.deaths || undefined,
            },
            {
              description: 'S/D Ratio',
              isBetter:
                selectedPlayer &&
                getSortConditionByKey(
                  'saveDeathRatio',
                  playerData,
                  selectedPlayer,
                ),
              value: playerData?.saveDeathRatio,
              compareValue: selectedPlayer?.saveDeathRatio || undefined,
            },
            {
              description: 'Win Rate',
              isBetter:
                selectedPlayer &&
                getSortConditionByKey('winRate', playerData, selectedPlayer),
              value: playerData?.winRate,
              compareValue: selectedPlayer?.winRate || undefined,
            },
            {
              description: 'Highest Win Streak',
              isBetter:
                selectedPlayer &&
                getSortConditionByKey(
                  'highestWinStreak',
                  playerData,
                  selectedPlayer,
                ),
              value: playerData?.highestWinStreak,
              compareValue: selectedPlayer?.highestWinStreak || undefined,
            },
          ]}
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
