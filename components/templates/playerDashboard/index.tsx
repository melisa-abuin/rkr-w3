'use client'

import Info from '@/components/atoms/info'
import { PageContainer } from '@/components/atoms/pageContainer'
import Awards from '@/components/molecules/awards'
import DownloadModal from '@/components/molecules/downloadModal'
import PlayerFinder from '@/components/molecules/playerFinder'
import WinStreak from '@/components/molecules/winStreak'
import ColumnsWithComparison from '@/components/organisms/columnsWithComparison'
import {
  difficultyNames,
  kibblesColumns,
  personalBestsColumns,
  playerColumns,
  playerDifficultyColumns,
  playerTimeColumns,
} from '@/constants'
import { useToast } from '@/hooks/useToast'
import { Player } from '@/interfaces/player'
import { formatCompare, formatDateToLocale, playerDataOutdated } from '@/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import { Row } from './styled'
import Tabs from '@/components/atoms/tabs'
import { useApiQuery } from '@/hooks/useApiQuery'
import { useQueryErrorToast } from '@/hooks/useQueryErrorToast'
import Header from './components/Header'
import Collapsible from '@/components/atoms/collapsible'
import Besties from './components/besties'
import Columns from '@/components/molecules/columns'

export default function PlayerDashboard({
  playerData,
}: {
  playerData: Player
}) {
  const {
    awards,
    battleTag,
    skins,
    lastUploaded,
    completedChallenges,
    mostPlayedColor,
  } = playerData

  const router = useRouter()
  const searchParams = useSearchParams()
  const compareTo = searchParams?.get('compareTo')
  const { showToast } = useToast()

  const lastDateUploaded = formatDateToLocale(lastUploaded)

  const { data, isFetching, error } = useApiQuery<Player>(
    compareTo ? `/api/player/${encodeURIComponent(compareTo)}` : '',
    undefined,
    { enabled: !!compareTo },
  )

  useQueryErrorToast(
    error,
    `Couldn't fetch the stats of ${compareTo}, please try again later.`,
  )

  useEffect(() => {
    if (data) {
      const outDatedPlayer = playerDataOutdated(playerData, data)
      if (outDatedPlayer) {
        showToast(
          `It looks like ${outDatedPlayer} hasn't uploaded their stats for a long time. It's likely that their stats are outdated.`,
          'warning',
          4000,
        )
      }
    }
  }, [data, playerData, showToast])

  const handlePlayerSelect = useCallback(
    (player: Player) => {
      router.push(`?compareTo=${encodeURIComponent(player.battleTag.tag)}`)
    },
    [router],
  )

  const handleClear = useCallback(() => {
    router.push('?')
  }, [router])

  const showBesties =
    playerData.fastestBesties &&
    (playerData.fastestBesties[3].length > 0 ||
      playerData.fastestBesties[2].length > 0)

  return (
    <>
      <PageContainer>
        <Header
          battleTag={battleTag.tag}
          color={mostPlayedColor}
          skin={skins?.selectedSkin}
          title={
            data
              ? `${battleTag.name} vs ${data.battleTag.name}`
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

      <PageContainer title="Overall Stats" marginBottom={24}>
        <Row>
          <ColumnsWithComparison
            columns={playerColumns}
            loading={isFetching}
            player={playerData}
            comparePlayer={data}
          />
          <WinStreak
            current={playerData.winStreak}
            highest={playerData.highestWinStreak}
          />
        </Row>
      </PageContainer>

      {difficultyNames.map((difficulty) => (
        <PageContainer key={difficulty} marginBottom={24}>
          <Collapsible title={`${difficulty} stats`}>
            <ColumnsWithComparison
              columns={playerDifficultyColumns}
              loading={isFetching}
              player={playerData}
              comparePlayer={data}
              difficulty={difficulty}
              variant="secondary"
            />
            <ColumnsWithComparison
              columns={playerTimeColumns}
              loading={isFetching}
              player={playerData}
              comparePlayer={data}
              difficulty={difficulty}
              variant="secondary"
            />
          </Collapsible>
        </PageContainer>
      ))}

      <PageContainer marginBottom={24}>
        <Collapsible title="Solo Stats">
          <ColumnsWithComparison
            columns={playerTimeColumns}
            loading={isFetching}
            player={playerData}
            comparePlayer={data}
            difficulty="solo"
            variant="secondary"
          />
        </Collapsible>
      </PageContainer>

      {showBesties && (
        <PageContainer title="Fastest Besties" marginBottom={24}>
          <Besties
            battleTag={playerData.battleTag.name}
            besties={playerData.fastestBesties}
          />
        </PageContainer>
      )}

      <PageContainer title="Personal bests" marginBottom={24}>
        <Row>
          <Columns
            title="All time"
            data={formatCompare(playerData, data, kibblesColumns)}
            loading={isFetching}
          />
          <Columns
            title="Single Game"
            data={formatCompare(playerData, data, personalBestsColumns)}
            loading={isFetching}
          />
        </Row>
      </PageContainer>

      <PageContainer title="Game Awards">
        {data ? (
          <Tabs
            titles={[
              `${battleTag.name} - ${completedChallenges.general[0]}/${completedChallenges.general[1]}`,
              `${data.battleTag.name} - ${data.completedChallenges.general[0]}/${data.completedChallenges.general[1]}`,
            ]}
          >
            <Awards awards={awards} />
            <Awards awards={data.awards} />
          </Tabs>
        ) : (
          <Awards awards={awards} />
        )}
      </PageContainer>

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
