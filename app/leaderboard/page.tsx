import Error from '@/components/molecules/error'
import { ThemeProvider } from '@/hooks/useTheme'
import Navbar from '@/components/molecules/navbar'
import Footer from '@/components/molecules/footer'
import { headers } from 'next/headers'
import LeaderboardTemplate from '@/components/templates/leaderboard'
import { ToastProvider } from '@/hooks/useToast'
import { LeaderboardCategories } from '@/interfaces/leaderboard'

interface PlayerStatsData {
  error: string | null
  data: {
    stats: Array<LeaderboardCategories>
    times: Array<LeaderboardCategories>
  }
}

async function fetchData(): Promise<PlayerStatsData> {
  const headersList = headers()
  const protocol = headersList.get('x-forwarded-proto') || 'http'
  const host = headersList.get('host')

  // workaround for feature instances
  const isStage = process.env.ENVIRONMENT === 'stage'
  const url = isStage ? 'https://rkr-w3.vercel.app' : `${protocol}://${host}`

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
      <ToastProvider>
        <Navbar />
        <main>
          {error ? <Error /> : data && <LeaderboardTemplate data={data} />}
        </main>
        <Footer />
      </ToastProvider>
    </ThemeProvider>
  )
}
