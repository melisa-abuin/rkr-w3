import Error from '@rkr/dls/components/molecules/error'
import SeasonsTemplate from '@rkr/dls/components/templates/seasons'
import { seasonScoreboardApi, seasonsApi } from '@rkr/dls/constants'
import {
  LeagueLeaderboardApiResponse,
  LeagueScoreboardApiResponse,
  LeagueSeason,
  LeagueSeasonData,
  LeagueSeasonsApiResponse,
} from '@rkr/dls/interfaces/league'

interface SeasonsData {
  error: string | null
  data: LeagueSeasonData[]
}

async function fetchSeasonData(
  season: LeagueSeason,
): Promise<LeagueSeasonData> {
  const [leaderboardResponse, scoreboardResponse] = await Promise.all([
    fetch(`${seasonsApi}/${season.id}/leaderboard`, {
      next: { revalidate: 480 },
    }),
    fetch(seasonScoreboardApi(season.id), {
      next: { revalidate: 480 },
    }),
  ])

  const leaderboard: LeagueLeaderboardApiResponse =
    leaderboardResponse.status === 200
      ? await leaderboardResponse.json()
      : { stats: [], times: [] }

  const rawScoreboard =
    scoreboardResponse.status === 200 ? await scoreboardResponse.json() : []

  const scoreboard: LeagueScoreboardApiResponse = Array.isArray(rawScoreboard)
    ? rawScoreboard
    : (rawScoreboard.stats ?? [])

  return {
    season,
    leaderboard,
    podium: scoreboard.slice(0, 3),
    scoreboard: scoreboard.slice(0, 5),
  }
}

async function fetchData(): Promise<SeasonsData> {
  const response = await fetch(seasonsApi, {
    next: { revalidate: 480 },
  })

  if (response.status !== 200) {
    return { data: [], error: 'Something went wrong' }
  }

  const seasons: LeagueSeasonsApiResponse = await response.json()

  return {
    data: await Promise.all(seasons.map(fetchSeasonData)),
    error: null,
  }
}

export default async function SeasonsPage() {
  const { data, error } = await fetchData()

  return <main>{error ? <Error /> : <SeasonsTemplate seasons={data} />}</main>
}
