'use client'

import { PageContainer } from '@/components/atoms/pageContainer'
import Awards from '@/components/molecules/awards'
import Columns from '@/components/molecules/columns'
import PageHeader from '@/components/atoms/pageHeader'
import PlayerFinder from '@/components/molecules/playerFinder'
import { difficultyNames, playerColumns, roundNames } from '@/constants'
import { DetailedPlayerStats, PlayerStats } from '@/interfaces/player'
import { formatKeyToWord } from '@/utils/formatKeyToWord'
import { secondsToSexagesimal } from '@/utils/secondsToSexagesimal'
import { useCallback, useState } from 'react'
import { getSortConditionByKey } from '@/utils/getSortConditionByKey'
import Info from '@/components/atoms/info'

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

  const lastDateUploaded = new Date(playerData.lastUploaded)

  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  } as const

  const fetchData = useCallback(async (player: PlayerStats) => {
    setLoading(true)

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
      setError(null)
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
        <PlayerFinder
          onPlayerSelect={fetchData}
          placeholder="Compare with another player"
        />
        {error && (
          <p>There was an error handling the request. Try again later</p>
        )}
      </PageContainer>
      <PageContainer title="Overall Stats">
        <Columns
          loading={loading}
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
            loading={loading}
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
      {playerData.lastUploaded && (
        <Info>
          Stats last uploaded on:{' '}
          {lastDateUploaded.toLocaleDateString(undefined, dateOptions)}
        </Info>
      )}
    </>
  )
}
