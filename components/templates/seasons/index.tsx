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
    <PageContainer marginBottom={24} withPadding={false}>
      <PageHeader description="" title="Seasons" />
      <PageContainer
        title={`${seasonData.leagueId} (Ends in ${getDaysUntil(seasonData.endDate)} days)`}
        withPadding={false}
      >
        <Podium podium={podium} />
        <PageContainer
          ariaLabelledby="columns-score-title"
          title="Best Scores"
          withPadding={false}
        >
          <ColumnCards data={leaderboard.stats} filter="stats" />
        </PageContainer>
        <PageContainer
          ariaLabelledby="columns-time-title"
          title="Best Times"
          withPadding={false}
        >
          <ColumnCards data={leaderboard.times} filter="times" />
        </PageContainer>
      </PageContainer>
    </PageContainer>
  )
}
