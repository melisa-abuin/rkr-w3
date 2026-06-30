import Error from '@/components/molecules/error'
import LeaderboardTemplate from '@/components/templates/leaderboard'
import { playersLeaderboard } from '@/constants'
import { LeaderboardCategories } from '@/interfaces/leaderboard'

interface PlayerStatsData {
  error: string | null
  data: {
    stats: Array<LeaderboardCategories>
    times: Array<LeaderboardCategories>
  }
}

async function fetchData(): Promise<PlayerStatsData> {
  const response = await fetch(playersLeaderboard, {
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
