'use client'

import Info from '@/components/atoms/info'
import { PageContainer } from '@/components/atoms/pageContainer'
import Awards from '@/components/molecules/completedAwards'
import PlayerFinder from '@/components/molecules/playerFinder'
import WinStreak from '@/components/molecules/winStreak'
import ColumnsWithComparison from '@/components/organisms/columnsWithComparison'
import {
  apiUrl,
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

  const router = useRouter()
  const searchParams = useSearchParams()
  const compareTo = searchParams?.get('compareTo')
  const { showToast } = useToast()

  const lastDateUploaded = formatDateToLocale(lastUploaded)

  const { data, isFetching, error } = useApiQuery<Player[]>(
    compareTo
      ? `${apiUrl}/api/Players/summary?battleTag=${encodeURIComponent(compareTo)}`
      : '',
    undefined,
    { enabled: !!compareTo },
  )
  const comparePlayer = data ? data[0] : undefined

  useQueryErrorToast(
    error,
    `Couldn't fetch the stats of ${compareTo}, please try again later.`,
  )

  useEffect(() => {
    if (comparePlayer) {
      const outDatedPlayer = playerDataOutdated(currentPlayer, comparePlayer)
      if (outDatedPlayer) {
        showToast(
          `It looks like ${outDatedPlayer} hasn't uploaded their stats for a long time. It's likely that their stats are outdated.`,
          'warning',
          5000,
        )
      }
    }
  }, [currentPlayer, showToast, comparePlayer])

  const handlePlayerSelect = useCallback(
    (battleTag: string) => {
      router.push(`?compareTo=${encodeURIComponent(battleTag)}`)
    },
    [router],
  )

  const handleClear = useCallback(() => {
    router.push('?')
  }, [router])

  return (
    <>
      <PageContainer>
        <Header
          battleTag={battleTag.tag}
          color={mostPlayedColor}
          skin={skins?.selectedSkin}
          title={
            comparePlayer
              ? `${currentPlayer.battleTag?.name} vs ${comparePlayer.battleTag?.name}`
              : currentPlayer.battleTag?.name
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
            comparePlayer={comparePlayer}
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
              comparePlayer={comparePlayer}
              difficulty={difficulty}
              loading={isFetching}
              player={currentPlayer}
              variant="secondary"
            />
            <ColumnsWithComparison
              columns={playerTimeColumns}
              comparePlayer={comparePlayer}
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
            comparePlayer={comparePlayer}
            difficulty="solo"
            loading={isFetching}
            player={currentPlayer}
            variant="secondary"
          />
        </Collapsible>
      </PageContainer>

      <PageContainer marginBottom={24} title="Fastest Besties">
        <Besties battleTag={currentPlayer.battleTag} />
      </PageContainer>

      <PageContainer marginBottom={24} title="Personal bests">
        <div className={styles.row}>
          <Columns
            data={formatCompare(currentPlayer, comparePlayer, kibblesColumns)}
            loading={isFetching}
            title="All time"
          />
          <Columns
            data={formatCompare(
              currentPlayer,
              comparePlayer,
              personalBestsColumns,
            )}
            loading={isFetching}
            title="Single Game"
          />
        </div>
      </PageContainer>

      <PageContainer title="Game Awards">
        {comparePlayer ? (
          <Tabs
            titles={[
              `${currentPlayer.battleTag.name} - ${completedChallenges.general[0]}/${completedChallenges.general[1]}`,
              `${comparePlayer.battleTag.name} - ${comparePlayer.completedChallenges.general[0]}/${comparePlayer.completedChallenges.general[1]}`,
            ]}
          >
            <Awards awards={awards} />
            <Awards awards={comparePlayer?.awards} />
          </Tabs>
        ) : (
          <Awards awards={awards} />
        )}
      </PageContainer>

      {lastDateUploaded && (
        <Info>Stats last uploaded on: {lastDateUploaded}</Info>
      )}

      {/* 
      Re enable on #372 after api is updated to generate new file format
      <PageContainer marginBottom={24}>
        <DownloadModal
          battletag={currentPlayer.battleTag}
          date={lastDateUploaded}
        />
      </PageContainer> */}
    </>
  )
}
