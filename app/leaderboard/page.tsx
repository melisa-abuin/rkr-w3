import Error from '@/components/error'
import Table from '@/components/table'
import { BestTime, PlayersStats } from '@/interfaces/player'
import { ThemeProvider } from '@/hooks/useTheme'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import PageHeader from '@/components/pageHeader'
import { statsColumns, timeAllDiffColumns } from '@/constants'
import { headers } from 'next/headers'
import ColumnCards from '@/components/columnCards'
import Info from '@/components/info'
import Link from 'next/link'

interface Data {
  player: string
  data: number | BestTime
}

interface PlayerStatsData {
  error: string | null
  data: {
    scoreboard?: PlayersStats
    leaderboard?: {
      stats: Array<{ category: string; data: Data[] }>
      times: Array<{ category: string; data: Data[] }>
    }
  }
}

async function fetchData(): Promise<PlayerStatsData> {
  const headersList = headers()
  const protocol = headersList.get('x-forwarded-proto') || 'http' // For Vercel and proxies
  const host = headersList.get('host')
  const url = `${protocol}://${host}`

  const response = await fetch(`${url}/api/scoreboard`)
  if (response.status === 200) {
    return {
      data: await response.json(),
      error: null,
    }
  }
  return {
    data: {},
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
            <ColumnCards data={data.leaderboard?.stats} />
            <Table
              columns={statsColumns}
              data={data.scoreboard}
              headerLink={
                <Link
                  href="/stats/overview"
                  aria-label="View all stats for players"
                >
                  View all stats
                </Link>
              }
              title="Overall Stats"
            />
            <ColumnCards data={data.leaderboard?.times} />
            <Table
              columns={timeAllDiffColumns}
              data={data.scoreboard}
              headerLink={
                <Link
                  href="/stats/time"
                  aria-label="View all times for players"
                >
                  View all times
                </Link>
              }
              title="Time Stats"
            />
            <Info>
              we understand that some players might not want to see their battle
              tag on this page, we are currently working on an automated
              solution, in the meantime please contact the page administrator to
              a manual removal
            </Info>
          </>
        )}
      </main>
      <Footer />
    </ThemeProvider>
  )
}
