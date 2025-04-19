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
import Link from '@/components/atoms/link'
import HelpInfo from '@/components/molecules/helpInfo'
import { useEffect, useState } from 'react'
import { useToast } from '@/hooks/useToast'
import { LeaderboardCategories } from '@/interfaces/leaderboard'
import Tabs from '@/components/atoms/tabs'

interface PlayerStatsData {
  stats: Array<LeaderboardCategories>
  times: Array<LeaderboardCategories>
}

export default function Leaderboard({ data }: { data: PlayerStatsData }) {
  const [statsData, setStatsData] = useState<
    { stats: PlayersStats; page: number } | undefined
  >()
  const [loading, setLoading] = useState(true)
  const { showToast } = useToast()

  useEffect(() => {
    const fetchFilteredData = async () => {
      setLoading(true)

      // TODO: create helper or what about react query?
      try {
        const response = await fetch(
          '/api/stats?page=1&sortKey=completedChallenges&sortOrder=desc&pageSize=5',
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
        setStatsData(result)
      } catch (error) {
        showToast(`Couldn't fetch the top five stats, please try again later.`)
      } finally {
        setLoading(false)
      }
    }

    fetchFilteredData()
  }, [showToast])

  return (
    <>
      <PageContainer>
        <PageHeader
          description="Best times and scores of Run Kitty Run players. The scores shown on this page are subject to the files uploaded by the players, if a player is not present in this table it is because they have not uploaded their statistics in the latest versions of the game"
          title="Leaderboard"
        />
        <PlayerFinderWithResult />
        <Tabs
          disabledTabs={['Kibbles (Coming soon)']}
          titles={['General', 'Best Game Times', 'Kibbles (Coming soon)']}
        >
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
                loading={loading}
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
              <Link
                colorName="tertiary"
                href="/stats/overview?page=1&sortKey=completedChallenges&sortOrder=desc"
                withButtonStyle
              >
                View all stats
              </Link>
            </PageContainer>
          </div>
          <PageContainer
            ariaLabelledby="columns-best-games-title"
            title="Best game times"
            withPadding={false}
          >
            <BestGamesWithControls />
          </PageContainer>
        </Tabs>
      </PageContainer>
      <HelpInfo />
    </>
  )
}
