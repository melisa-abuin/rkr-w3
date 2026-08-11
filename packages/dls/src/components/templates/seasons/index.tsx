'use client'

import Button from '@/components/atoms/button'
import PageContainer from '@/components/atoms/pageContainer'
import PageHeader from '@/components/atoms/pageHeader'
import ColumnCards from '@/components/molecules/columnCards'
import Table from '@/components/molecules/table'
import ColumnCardsWithControls from '@/components/organisms/columnCardsWithControls'
import Podium from '@/components/organisms/podium'
import { seasonsApi } from '@/constants'
import { leagueScoreboardBreakdownColumns } from '@/constants/tableColumns'
import { useDifficultyFilter } from '@/hooks/useDifficultyFilter'
import {
  LeagueLeaderboardApiResponse,
  LeagueScoreboardEntry,
  LeagueSeason,
} from '@/interfaces/league'
import { getDaysUntil } from '@/utils'

interface SeasonsTemplateProps {
  seasonData: LeagueSeason
  leaderboard: LeagueLeaderboardApiResponse
  podium: LeagueScoreboardEntry[]
  scoreboard: LeagueScoreboardEntry[]
}

export default function SeasonsTemplate({
  leaderboard,
  podium,
  seasonData,
  scoreboard,
}: SeasonsTemplateProps) {
  const {
    difficultyFilter,
    filteredData: timesFilteredData,
    isFetching: isTimesFilterFetching,
    onFilterClick,
  } = useDifficultyFilter<LeagueLeaderboardApiResponse>(
    `${seasonsApi}/${seasonData.id}/leaderboard`,
  )

  return (
    <PageContainer marginBottom={24}>
      <PageHeader
        description="Seasons are time-limited competitive periods where players earn league points and climb the rankings. Top players will appear on the podium."
        title="Seasons"
      />
      <PageContainer
        subtitle={`Ends in ${getDaysUntil(seasonData.endDate)} days`}
        title={seasonData.leagueId}
        withPadding={false}
      >
        <Podium podium={podium} />
        <PageContainer
          ariaLabelledby="columns-score-title"
          title="Best Scores"
          withPadding={false}
        >
          <ColumnCards
            data={leaderboard.stats}
            filter="stats"
            withViewAll={false}
          />
        </PageContainer>

        <ColumnCardsWithControls
          data={leaderboard.times}
          difficultyFilter={difficultyFilter}
          filter="times"
          filteredData={timesFilteredData?.times}
          isFetching={isTimesFilterFetching}
          seasonId={seasonData.id.toString()}
          title="Best times"
          onFilterClick={onFilterClick}
        />
        <PageContainer marginTop={32} withPadding={false}>
          <Table
            columns={leagueScoreboardBreakdownColumns}
            data={scoreboard.map((entry) => ({
              ...entry.breakdown,
              battleTag: entry.player,
            }))}
            title="Season breakdown"
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
            href={`stats?page=1&season=${seasonData.id}&sortKey=weightedWins&sortOrder=desc&filter=breakdown`}
            variant="outline"
          >
            View all stats
          </Button>
        </PageContainer>
      </PageContainer>
    </PageContainer>
  )
}
