import Error from '@/components/molecules/error'
import { BestTime } from '@/interfaces/player'
import { ThemeProvider } from '@/hooks/useTheme'
import Navbar from '@/components/molecules/navbar'
import Footer from '@/components/molecules/footer'
import { headers } from 'next/headers'
import LeaderboardTemplate from '@/components/templates/leaderboard'

interface Data {
  player: string
  data: number | BestTime
}

interface PlayerStatsData {
  error: string | null
  data: {
    stats: Array<{ category: string; key: string; data: Data[] }>
    times: Array<{ category: string; key: string; data: Data[] }>
  }
}

async function fetchData(): Promise<PlayerStatsData> {
  const headersList = headers()
  const protocol = headersList.get('x-forwarded-proto') || 'http' // For Vercel and proxies
  const host = headersList.get('host')
  const url = `${protocol}://${host}`

  const response = await fetch(`${url}/api/leaderboard`)
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
    <ThemeProvider>
      <Navbar />
      <main>
        {error ? <Error /> : data && <LeaderboardTemplate data={data} />}
      </main>
      <Footer />
    </ThemeProvider>
  )
}
