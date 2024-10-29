import Error from '@/components/error'
import Table from '@/components/table'
import { PlayersStats } from '@/interfaces/player'
import { ThemeProvider } from '@/hooks/useTheme'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import PageHeader from '@/components/pageHeader'
import { statsColumns, timeAllDiffColumns } from '@/constants'

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
      <main>
        {error ? (
          <Error />
        ) : (
          <>
            <PageHeader
              description="On this page you can find the statistics of each Run Kitty Run player. See who the best players are and compare your times and scores with those of others"
              title="Stats"
            />
            <Table columns={statsColumns} data={data} title="Overall Stats" />
            <Table
              columns={timeAllDiffColumns}
              data={data}
              title="Time Stats"
            />
          </>
        )}
      </main>
      <Footer />
    </ThemeProvider>
  )
}
