'use client'

import Info from '@/components/atoms/info'
import { PageContainer } from '@/components/atoms/pageContainer'
import PageHeader from '@/components/atoms/pageHeader'
import Awards from '@/components/molecules/awards'
import Columns from '@/components/molecules/columns'
import DownloadModal from '@/components/molecules/downloadModal'
import PlayerFinder from '@/components/molecules/playerFinder'
import ColumnsWithComparison from '@/components/organisms/compareColumns'
import {
  difficultyNames,
  playerColumns,
  playerTimeColumns,
  roundNames,
} from '@/constants'
import { useToast } from '@/hooks/useToast'
import { DetailedPlayerStats, PlayerStats } from '@/interfaces/player'
import { formatKeyToWord } from '@/utils/formatKeyToWord'
import { getSortConditionByKey } from '@/utils/getSortConditionByKey'
import { secondsToSexagesimal } from '@/utils/secondsToSexagesimal'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

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
  const { showToast } = useToast()

  const router = useRouter()
  const searchParams = useSearchParams()
  const compareTo = searchParams?.get('compareTo')

  const lastDateUploaded = getDateToShow(playerData.lastUploaded)

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
      } catch (error) {
        showToast(
          `Couldn't fetch the stats of ${playerTag}, please try again later.`,
        )
      } finally {
        setLoading(false)
      }
    },
    [showToast],
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
        <ColumnsWithComparison
          loading={loading}
          player={playerData}
          comparePlayer={selectedPlayer}
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
          <ColumnsWithComparison
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
