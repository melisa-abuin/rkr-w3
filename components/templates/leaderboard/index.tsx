'use client'

import { PageContainer } from '@/components/atoms/pageContainer'
import PageHeader from '@/components/atoms/pageHeader'
import { statsColumns } from '@/constants'
import { PlayersStats } from '@/interfaces/player'
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
    stats: PlayersStats
    page: number
  }>(
    '/api/stats?page=1&sortKey=completedChallenges&sortOrder=desc&pageSize=5',
    undefined,
    {
      enabled: true,
    },
  )

  useQueryErrorToast(
    error,
    `Couldn't fetch the top five stats, please try again later.`,
  )

  return (
    <>
      <PageContainer>
        <PageHeader
          description="Best times and scores of Run Kitty Run players. The scores shown on this page are subject to the files uploaded by the players, if a player is not present in this table it is because they have not uploaded their statistics in the latest versions of the game"
          title="Leaderboards"
        />
        <PlayerFinderWithResult />
        <Tabs titles={['General', 'Best Game Times', 'Kibbles']}>
          <div>
            <PageContainer
              ariaLabelledby="columns-score-title"
              withPadding={false}
              title="Best scores"
            >
              <ColumnCards data={data?.stats} viewAllKey="overview" />
            </PageContainer>

            <ColumnCardsWithControls
              data={data?.times}
              viewAllKey="time"
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
                loading={isFetching}
                data={statsData?.stats ?? []}
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
                variant="outline"
                colorName="primary"
                href="/stats/overview?page=1&sortKey=completedChallenges&sortOrder=desc"
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
