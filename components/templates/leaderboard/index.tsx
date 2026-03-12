'use client'

import { PageContainer } from '@/components/atoms/pageContainer'
import PageHeader from '@/components/atoms/pageHeader'
import { routes, statsColumns } from '@/constants'
import { Player } from '@/interfaces/player'
import PlayerFinderWithResult from '@/components/organisms/playerFinderWithResult'
import ColumnCards from '@/components/molecules/columnCards'
import ColumnCardsWithControls from '@/components/organisms/columnCardsWithControls'
import BestGamesWithControls from '@/components/organisms/bestGamesWithControls'
import Table from '@/components/molecules/table'
import HelpInfo from '@/components/molecules/helpInfo'
import { LeaderboardCategories } from '@/interfaces/leaderboard'
import Tabs from '@/components/atoms/tabs'
import KibbleLeaderboardWithMoreResults from '@/components/organisms/kibbleLeaderboardWithMoreResults'
import Button from '@/components/atoms/button'
import { useApiQuery } from '@/hooks/useApiQuery'
import { useQueryErrorToast } from '@/hooks/useQueryErrorToast'
import { useState } from 'react'

interface PlayerStatsData {
  stats: Array<LeaderboardCategories>
  times: Array<LeaderboardCategories>
}

export default function Leaderboard({ data }: { data: PlayerStatsData }) {
  const {
    data: statsData,
    isFetching,
    error,
  } = useApiQuery<{
    stats: Player[]
    page: number
  }>(
    '/api/stats?filter=stats&page=1&sortKey=completedChallenges&sortOrder=desc&pageSize=5',
    undefined,
    {
      enabled: true,
    },
  )

  useQueryErrorToast(
    error,
    `Couldn't fetch the top five stats, please try again later.`,
  )

  const [selectedPlayer, setSelectedPlayer] = useState<Player | undefined>()

  const handleClear = () => {
    setSelectedPlayer(undefined)
  }

  return (
    <>
      <PageContainer>
        <PageHeader
          description="Best times and scores of Run Kitty Run players. The scores shown on this page are subject to the files uploaded by the players, if a player is not present in this table it is because they have not uploaded their statistics in the latest versions of the game"
          title="Leaderboards"
        />
        <PageContainer marginBottom={16} withPadding={false}>
          <PlayerFinderWithResult
            selectedPlayer={selectedPlayer}
            setSelectedPlayer={setSelectedPlayer}
            onClear={handleClear}
          />
        </PageContainer>
        <Tabs titles={['General', 'Best Game Times', 'Kibbles']}>
          <div>
            <PageContainer
              ariaLabelledby="columns-score-title"
              title="Best scores"
              withPadding={false}
            >
              <ColumnCards
                data={data?.stats}
                filter="stats"
                selectedPlayer={selectedPlayer?.battleTag.tag}
              />
            </PageContainer>

            <ColumnCardsWithControls
              data={data?.times}
              filter="times"
              selectedPlayer={selectedPlayer?.battleTag.tag}
              title="Best times"
            />

            <PageContainer
              as="div"
              marginBottom={24}
              marginTop={24}
              withPadding={false}
            >
              <Table
                columns={statsColumns}
                data={statsData?.stats ?? []}
                loading={isFetching}
                title="Leaderboard Highlights: Top Five Stats"
              />
            </PageContainer>
            <PageContainer
              as="div"
              marginBottom={24}
              marginTop={24}
              withPadding={false}
            >
              <Button
                as="a"
                colorName="primary"
                href={routes.scoreboard.url}
                variant="outline"
              >
                View all stats
              </Button>
            </PageContainer>
          </div>
          <PageContainer
            ariaLabelledby="columns-best-games-title"
            title="Best game times"
            withPadding={false}
          >
            <BestGamesWithControls />
          </PageContainer>
          <PageContainer
            ariaLabelledby="columns-kibble-title"
            title="Kibbles collected in a single game"
            withPadding={false}
          >
            <KibbleLeaderboardWithMoreResults />
          </PageContainer>
        </Tabs>
      </PageContainer>
      <HelpInfo />
    </>
  )
}
