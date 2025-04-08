'use client'

import Info from '@/components/atoms/info'
import { PageContainer } from '@/components/atoms/pageContainer'
import PageHeader from '@/components/atoms/pageHeader'
import Awards from '@/components/molecules/awards'
import DownloadModal from '@/components/molecules/downloadModal'
import PlayerFinder from '@/components/molecules/playerFinder'
import WinStreak from '@/components/molecules/winStreak'
import ColumnsWithComparison from '@/components/organisms/columnsWithComparison'
import {
  playerColumns,
  playerTimeColumns,
  roundDifficultyNames,
} from '@/constants'
import { useToast } from '@/hooks/useToast'
import { DetailedPlayerStats, PlayerStats } from '@/interfaces/player'
import { formatKeyToWord } from '@/utils/formatKeyToWord'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { Row } from './styled'
import Tabs from '@/components/atoms/tabs'

const getDateToShow = (lastUploaded: string) => {
  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  } as const

  if (!lastUploaded) return ''

  const lastDateUploaded = new Date(lastUploaded)
  return lastDateUploaded.toLocaleDateString(undefined, dateOptions)
}
const playerDataOutdated = (
  player1: DetailedPlayerStats,
  player2: DetailedPlayerStats,
): string | null => {
  const player1Date = new Date(player1.lastUploaded)
  const player2Date = new Date(player2.lastUploaded)

  const diffInMs = Math.abs(player1Date.getTime() - player2Date.getTime())
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24)

  if (diffInDays < 30) return null

  return player1Date > player2Date
    ? player2.battleTag.name
    : player1.battleTag.name
}

export default function PlayerDashboard({
  playerData,
}: {
  playerData: DetailedPlayerStats
}) {
  const { awards, battleTag, skins, lastUploaded } = playerData
  const [selectedPlayer, setSelectedPlayer] = useState<
    DetailedPlayerStats | undefined
  >()
  const [loading, setLoading] = useState(false)
  const { showToast } = useToast()

  const router = useRouter()
  const searchParams = useSearchParams()
  const compareTo = searchParams?.get('compareTo')

  const lastDateUploaded = getDateToShow(lastUploaded)

  const fetchData = useCallback(
    async (playerTag: string) => {
      setLoading(true)

      try {
        const response = await fetch(
          `/api/player/${encodeURIComponent(playerTag)}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const result = await response.json()
        setSelectedPlayer(result)

        if (result) {
          const outDatedPlayer = playerDataOutdated(playerData, result)
          if (outDatedPlayer) {
            showToast(
              `It looks like ${outDatedPlayer} hasn't uploaded their stats for a long time. It's likely that their stats are outdated.`,
              'warning',
              4000,
            )
          }
        }
      } catch (error) {
        showToast(
          `Couldn't fetch the stats of ${playerTag}, please try again later.`,
        )
      } finally {
        setLoading(false)
      }
    },
    [showToast, playerData],
  )

  useEffect(() => {
    if (compareTo) {
      fetchData(compareTo)
    }
  }, [compareTo, fetchData])

  const handlePlayerSelect = (player: PlayerStats) => {
    router.push(`?compareTo=${encodeURIComponent(player.battleTag.tag)}`)
  }

  const handleClear = () => {
    router.push(`?`)
    setSelectedPlayer(undefined)
  }

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
          onPlayerSelect={handlePlayerSelect}
          onClear={handleClear}
          placeholder="Compare with another player"
          defaultValue={compareTo || ''}
        />
      </PageContainer>
      <PageContainer title="Overall Stats">
        <Row>
          <ColumnsWithComparison
            columns={playerColumns}
            loading={loading}
            player={playerData}
            comparePlayer={selectedPlayer}
          />
          <WinStreak winStreak={playerData.winStreak} />
        </Row>
      </PageContainer>
      <PageContainer title="Game Awards" marginTop={24} marginBottom={24}>
        {selectedPlayer ? (
          <Tabs titles={[battleTag.name, selectedPlayer.battleTag.name]}>
            <Awards awards={awards} />
            <Awards awards={selectedPlayer.awards} />
          </Tabs>
        ) : (
          <Awards awards={awards} />
        )}
      </PageContainer>
      {roundDifficultyNames.map((difficulty) => (
        <PageContainer
          key={difficulty}
          title={`Best ${difficulty} Times`}
          marginBottom={24}
        >
          <ColumnsWithComparison
            columns={playerTimeColumns}
            loading={loading}
            player={playerData}
            comparePlayer={selectedPlayer}
            difficulty={difficulty}
          />
        </PageContainer>
      ))}
      {lastDateUploaded && (
        <Info>Stats last uploaded on: {lastDateUploaded}</Info>
      )}
      <PageContainer marginBottom={24}>
        <DownloadModal
          date={lastDateUploaded}
          battletag={playerData.battleTag.tag}
        />
      </PageContainer>
    </>
  )
}
