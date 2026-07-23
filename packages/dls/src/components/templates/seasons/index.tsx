'use client'

import PageContainer from '@/components/atoms/pageContainer'
import PageHeader from '@/components/atoms/pageHeader'
import ColumnCards from '@/components/molecules/columnCards'
import ColumnCardsWithControls from '@/components/organisms/columnCardsWithControls'
import Podium from '@/components/organisms/podium'
import { seasonsApi } from '@/constants'
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
}

export default function SeasonsTemplate({
  leaderboard,
  podium,
  seasonData,
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
          title="Best times"
          onFilterClick={onFilterClick}
        />
      </PageContainer>
    </PageContainer>
  )
}
