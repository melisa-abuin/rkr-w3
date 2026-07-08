import { PageContainer } from '@/components/atoms/pageContainer'
import PageHeader from '@/components/atoms/pageHeader'
import ColumnCards from '@/components/molecules/columnCards'
import Error from '@/components/molecules/error'
import { seasonsApi } from '@/constants'
import {
  LeagueLeaderboardApiResponse,
  LeagueSeason,
  LeagueSeasonsApiResponse,
} from '@/interfaces/league'
import { getDaysUntil } from '@/utils'

interface LewaguesData {
  error: string | null
  data: {
    seasons: LeagueSeasonsApiResponse
    currentSeason: {
      seasonData: LeagueSeason
      leaderboard: LeagueLeaderboardApiResponse
    }
  }
}

async function fetchData(): Promise<LewaguesData> {
  const response = await fetch(seasonsApi, {
    next: { revalidate: 480 },
  })

  const now = Date.now()

  if (response.status === 200) {
    const seasons: LeagueSeasonsApiResponse = await response.json()

    const currentSeason =
      seasons.find(
        (season) =>
          now >= new Date(season.startDate).getTime() &&
          now <= new Date(season.endDate).getTime(),
      ) ?? seasons[0]

    const leaderboardResponse = await fetch(
      `${seasonsApi}/${currentSeason.id}/leaderboard?difficulty=normal`,
      { next: { revalidate: 480 } },
    )

    const leaderboard: LeagueLeaderboardApiResponse =
      leaderboardResponse.status === 200
        ? await leaderboardResponse.json()
        : { stats: [], times: [] }

    return {
      data: {
        seasons,
        currentSeason: {
          seasonData: currentSeason,
          leaderboard,
        },
      },
      error: null,
    }
  }
  return {
    data: {
      seasons: [],
      currentSeason: {
        seasonData: {} as LeagueSeason,
        leaderboard: { stats: [], times: [] },
      },
    },
    error: 'Something went wrong',
  }
}

export default async function SeasonsPage() {
  const { data, error } = await fetchData()
  console.log('data', data)
  return (
    <main>
      {error ? (
        <Error />
      ) : (
        <PageContainer withPadding={false}>
          <PageHeader description="" title="Seasons" />
          <PageContainer
            title={data.currentSeason.seasonData.leagueId}
            withPadding={false}
          >
            <p>
              Ends in {getDaysUntil(data.currentSeason.seasonData.endDate)} days
            </p>
            <PageContainer
              ariaLabelledby="columns-score-title"
              title="Best Scores"
              withPadding={false}
            >
              <ColumnCards
                data={data.currentSeason.leaderboard.stats}
                filter="stats"
              />
            </PageContainer>
            <PageContainer
              ariaLabelledby="columns-time-title"
              title="Best Times"
              withPadding={false}
            >
              <ColumnCards
                data={data.currentSeason.leaderboard.times}
                filter="times"
              />
            </PageContainer>
          </PageContainer>
        </PageContainer>
      )}
    </main>
  )
}
