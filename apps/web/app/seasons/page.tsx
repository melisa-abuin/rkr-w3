import Error from '@rkr/dls/components/molecules/error'
import SeasonsTemplate from '@rkr/dls/components/templates/seasons'
import { seasonScoreboardApi, seasonsApi } from '@rkr/dls/constants'
import {
  LeagueLeaderboardApiResponse,
  LeagueScoreboardApiResponse,
  LeagueScoreboardEntry,
  LeagueSeason,
  LeagueSeasonsApiResponse,
} from '@rkr/dls/interfaces/league'

interface SeasonsData {
  error: string | null
  data: {
    seasons: LeagueSeasonsApiResponse
    currentSeason: {
      seasonData: LeagueSeason
      leaderboard: LeagueLeaderboardApiResponse
      podium: LeagueScoreboardEntry[]
    }
  }
}

async function fetchData(): Promise<SeasonsData> {
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

    if (!currentSeason) {
      return {
        data: {
          seasons: [],
          currentSeason: {
            seasonData: {} as LeagueSeason,
            leaderboard: { stats: [], times: [] },
            podium: [],
          },
        },
        error: 'Something went wrong',
      }
    }

    const [leaderboardResponse, scoreboardResponse] = await Promise.all([
      fetch(`${seasonsApi}/${currentSeason.id}/leaderboard`, {
        next: { revalidate: 480 },
      }),
      fetch(seasonScoreboardApi(currentSeason.id), {
        next: { revalidate: 480 },
      }),
    ])

    const leaderboard: LeagueLeaderboardApiResponse =
      leaderboardResponse.status === 200
        ? await leaderboardResponse.json()
        : { stats: [], times: [] }

    const scoreboard: LeagueScoreboardApiResponse =
      scoreboardResponse.status === 200 ? await scoreboardResponse.json() : []

    const podium = scoreboard.slice(0, 3)

    return {
      data: {
        seasons,
        currentSeason: {
          seasonData: currentSeason,
          leaderboard,
          podium,
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
        podium: [],
      },
    },
    error: 'Something went wrong',
  }
}

export default async function SeasonsPage() {
  const { data, error } = await fetchData()

  return (
    <main>
      {error ? (
        <Error />
      ) : (
        <SeasonsTemplate
          leaderboard={data.currentSeason.leaderboard}
          podium={data.currentSeason.podium}
          seasonData={data.currentSeason.seasonData}
        />
      )}
    </main>
  )
}
