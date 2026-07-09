import { PageContainer } from '@/components/atoms/pageContainer'
import PageHeader from '@/components/atoms/pageHeader'
import ColumnCards from '@/components/molecules/columnCards'
import Podium from '@/components/organisms/podium'
import {
  LeagueLeaderboardApiResponse,
  LeagueScoreboardEntry,
  LeagueSeason,
} from '@/interfaces/league'
import { getDaysUntil } from '@/utils'

interface Props {
  seasonData: LeagueSeason
  leaderboard: LeagueLeaderboardApiResponse
  podium: LeagueScoreboardEntry[]
}

export default function SeasonsTemplate({
  leaderboard,
  podium,
  seasonData,
}: Props) {
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
        <PageContainer
          ariaLabelledby="columns-time-title"
          title="Best Times"
          withPadding={false}
        >
          <ColumnCards
            data={leaderboard.times}
            filter="times"
            withViewAll={false}
          />
        </PageContainer>
      </PageContainer>
    </PageContainer>
  )
}
