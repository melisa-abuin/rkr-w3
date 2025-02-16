import Error from '@/components/error'
import Table from '@/components/table'
import { BestTime, PlayersStats } from '@/interfaces/player'
import { ThemeProvider } from '@/hooks/useTheme'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import PageHeader from '@/components/pageHeader'
import { statsColumns } from '@/constants'
import { headers } from 'next/headers'
import ColumnCards from '@/components/columnCards'
import { PageContainer } from '@/components/pageContainer'
import { Link } from '@/components/link'
import ColumnCardsWithControls from '@/components/columnCardsWithControls'
import Info from '@/components/info'

interface Data {
  player: string
  data: number | BestTime
}

interface PlayerStatsData {
  error: string | null
  data: {
    scoreboard?: PlayersStats
    leaderboard?: {
      stats: Array<{ category: string; key: string; data: Data[] }>
      times: Array<{ category: string; key: string; data: Data[] }>
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
              description="Best times and scores of Run Kitty Run players. The scores shown on this page are subject to the files uploaded by the players, if a player is not present in this table it is because they have not uploaded their statistics in the latest versions of the game"
              title="Leaderboard"
            />
            <PageContainer
              ariaLabelledby="columns-score-title"
              title="Best scores"
            >
              <ColumnCards
                data={data.leaderboard?.stats}
                viewAllKey="overview"
              />
            </PageContainer>

            <ColumnCardsWithControls
              data={data.leaderboard?.times}
              viewAllKey="time"
              title="Best times"
            />
            <Table
              columns={statsColumns}
              data={data.scoreboard}
              title="Leaderboard Highlights: Top Five Stats"
            />
            <PageContainer as="div" marginBottom={48}>
              <Link
                href="/stats/overview?page=1&sortKey=completedChallenges&sortOrder=desc"
                withButtonStyle
              >
                View all stats
              </Link>
            </PageContainer>
            <Info>
              <strong>Can&apos;t find your stats?</strong>{' '}
              <Link href="/guide" aria-label="View all stats for all players">
                Click here
              </Link>{' '}
              to learn how to upload your game progress and get featured on the
              leaderboard!
            </Info>
          </>
        )}
      </main>
      <Footer />
    </ThemeProvider>
  )
}
