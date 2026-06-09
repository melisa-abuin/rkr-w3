'use client'

import Info from '@/components/atoms/info'
import { PageContainer } from '@/components/atoms/pageContainer'
import Awards from '@/components/molecules/completedAwards'
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
import styles from './index.module.css'
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
  const currentPlayer = playerData instanceof Array ? playerData[0] : playerData
  const {
    awards,
    battleTag,
    skins,
    lastUploaded,
    completedChallenges,
    mostPlayedColor,
  } = currentPlayer
  console.log(currentPlayer)
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
          5000,
        )
      }
    }
  }, [data, playerData, showToast])

  const handlePlayerSelect = useCallback(
    (battleTag: string) => {
      router.push(`?compareTo=${encodeURIComponent(battleTag)}`)
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
          battleTag={battleTag}
          color={mostPlayedColor}
          skin={skins?.selectedSkin}
          title={
            data
              ? `${currentPlayer.battleTag?.split('#')[0]} vs ${data.battleTag?.split('#')[0]}`
              : currentPlayer.battleTag?.split('#')[0]
          }
        />
        <PlayerFinder
          defaultValue={compareTo || ''}
          placeholder="Compare with another player"
          onClear={handleClear}
          onPlayerSelect={handlePlayerSelect}
        />
      </PageContainer>

      <PageContainer marginBottom={24} title="Overall Stats">
        <div className={styles.row}>
          <ColumnsWithComparison
            columns={playerColumns}
            comparePlayer={data}
            loading={isFetching}
            player={currentPlayer}
          />
          <WinStreak
            current={currentPlayer.winStreak}
            highest={currentPlayer.highestWinStreak}
          />
        </div>
      </PageContainer>

      {difficultyNames.map((difficulty) => (
        <PageContainer key={difficulty} marginBottom={24}>
          <Collapsible title={`${difficulty} stats`}>
            <ColumnsWithComparison
              columns={playerDifficultyColumns}
              comparePlayer={data}
              difficulty={difficulty}
              loading={isFetching}
              player={currentPlayer}
              variant="secondary"
            />
            <ColumnsWithComparison
              columns={playerTimeColumns}
              comparePlayer={data}
              difficulty={difficulty}
              loading={isFetching}
              player={currentPlayer}
              variant="secondary"
            />
          </Collapsible>
        </PageContainer>
      ))}

      <PageContainer marginBottom={24}>
        <Collapsible title="Solo Stats">
          <ColumnsWithComparison
            columns={playerTimeColumns}
            comparePlayer={data}
            difficulty="solo"
            loading={isFetching}
            player={currentPlayer}
            variant="secondary"
          />
        </Collapsible>
      </PageContainer>

      {showBesties && (
        <PageContainer marginBottom={24} title="Fastest Besties">
          <Besties
            battleTag={currentPlayer.battleTag}
            besties={currentPlayer.fastestBesties}
          />
        </PageContainer>
      )}

      <PageContainer marginBottom={24} title="Personal bests">
        <div className={styles.row}>
          <Columns
            data={formatCompare(currentPlayer, data, kibblesColumns)}
            loading={isFetching}
            title="All time"
          />
          <Columns
            data={formatCompare(currentPlayer, data, personalBestsColumns)}
            loading={isFetching}
            title="Single Game"
          />
        </div>
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
          battletag={currentPlayer.battleTag}
          date={lastDateUploaded}
        />
      </PageContainer>
    </>
  )
}
