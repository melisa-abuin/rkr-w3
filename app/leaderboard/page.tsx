// eslint-disable-next-line
// @ts-nocheck
import Error from '@/components/error'
import Table from '@/components/table'
import { PlayersStats } from '@/interfaces/player'
import { ThemeProvider } from '@/hooks/useTheme'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import PageHeader from '@/components/pageHeader'
import { statsColumns, timeAllDiffColumns } from '@/constants'
import { headers } from 'next/headers'

interface PlayerStatsData {
  error: string | null
  data: PlayersStats | []
}

async function fetchData(): Promise<PlayerStatsData> {
  const headersList = headers()
  const protocol = headersList.get('x-forwarded-proto') || 'http' // For Vercel and proxies
  const host = headersList.get('host')
  const url = `${protocol}://${host}`

  const response = await fetch(`${url}/api/scoreboard`, {
    next: { revalidate: 86400 },
  })
  if (response.status === 200) {
    return {
      data: await response.json(),
      error: null,
    }
  }
  return {
    url: `${url}/api/scoreboard`,
    response,
    data: [],
    error: 'Something went wrong',
  }
}

export default async function Leaderboard() {
  const { data, error, response, url } = await fetchData()

  return (
    <ThemeProvider>
      <Navbar />
      <main>
        <pre>{JSON.stringify(response)}</pre>
        <pre>{JSON.stringify(data)}</pre>
        <pre>{url}</pre>
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
