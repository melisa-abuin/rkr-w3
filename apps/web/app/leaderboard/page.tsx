import Error from '@rkr/dls/components/molecules/error'
import LeaderboardTemplate from '@rkr/dls/components/templates/leaderboard'
import { playersLeaderboardApi } from '@rkr/dls/constants'
import { LeaderboardCategories } from '@rkr/dls/interfaces/leaderboard'

interface PlayerStatsData {
  error: string | null
  data: {
    stats: Array<LeaderboardCategories>
    times: Array<LeaderboardCategories>
  }
}

async function fetchData(): Promise<PlayerStatsData> {
  const response = await fetch(playersLeaderboardApi, {
    next: { revalidate: 480 },
  })

  if (response.status === 200) {
    return {
      data: await response.json(),
      error: null,
    }
  }
  return {
    data: { stats: [], times: [] },
    error: 'Something went wrong',
  }
}

export default async function Leaderboard() {
  const { data, error } = await fetchData()

  return (
    <main>
      {error ? <Error /> : data && <LeaderboardTemplate data={data} />}
    </main>
  )
}
