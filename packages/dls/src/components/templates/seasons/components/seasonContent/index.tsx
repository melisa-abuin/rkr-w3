'use client'

import Button from '@/components/atoms/button'
import PageContainer from '@/components/atoms/pageContainer'
import ColumnCards from '@/components/molecules/columnCards'
import Table from '@/components/molecules/table'
import ColumnCardsWithControls from '@/components/organisms/columnCardsWithControls'
import Podium from '@/components/organisms/podium'
import { seasonsApi } from '@/constants'
import { leagueScoreboardBreakdownColumns } from '@/constants/tableColumns'
import { useDifficultyFilter } from '@/hooks/useDifficultyFilter'
import {
  LeagueLeaderboardApiResponse,
  LeagueSeason,
  LeagueSeasonData,
} from '@/interfaces/league'
import { formatDateToLocale, getDaysUntil } from '@/utils'

interface SeasonContentProps {
  seasonData: LeagueSeasonData
}

const getSeasonSubtitle = ({ startDate, endDate }: LeagueSeason): string => {
  const now = Date.now()

  if (new Date(startDate).getTime() > now)
    return `Starts in ${getDaysUntil(startDate)} days`

  if (new Date(endDate).getTime() < now)
    return `Ended on ${formatDateToLocale(endDate)}`

  return `Ends in ${getDaysUntil(endDate)} days`
}

export default function SeasonContent({ seasonData }: SeasonContentProps) {
  const { season, leaderboard, podium, scoreboard } = seasonData

  const {
    difficultyFilter,
    filteredData: timesFilteredData,
    isFetching: isTimesFilterFetching,
    onFilterClick,
  } = useDifficultyFilter<LeagueLeaderboardApiResponse>(
    `${seasonsApi}/${season.id}/leaderboard`,
  )

  return (
    <PageContainer
      subtitle={getSeasonSubtitle(season)}
      title={season.leagueId}
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
        seasonId={season.id.toString()}
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
          href={`stats?page=1&seasonId=${season.id}&sortKey=weightedWins&sortOrder=desc&filter=breakdown`}
          variant="outline"
        >
          View all stats
        </Button>
      </PageContainer>
    </PageContainer>
  )
}
