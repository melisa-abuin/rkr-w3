import Error from '@/components/error'
import Table from '@/components/table'
import { PlayersStats } from '@/interfaces/player'
import { ThemeProvider } from '@/hooks/useTheme'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

interface PlayerStatsData {
  error: string | null
  data: PlayersStats | []
}

async function fetchData(): Promise<PlayerStatsData> {
  const response = await fetch('http://localhost:3000/api/scoreboard', {
    next: { revalidate: 86400 },
  })
  if (response.status === 200) {
    return {
      data: await response.json(),
      error: null,
    }
  }
  return {
    data: [],
    error: 'Something went wrong',
  }
}

export default async function Leaderboard() {
  const { data, error } = await fetchData()

  return (
    <ThemeProvider>
      <Navbar />
      <main>{error ? <Error /> : <Table data={data} />}</main>
      <Footer />
    </ThemeProvider>
  )
}
