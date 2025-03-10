import Error from '@/components/error'
import Table from '@/components/table'
import { BestTime, PlayersStats } from '@/interfaces/player'
import { ThemeProvider } from '@/hooks/useTheme'
import Navbar from '@/components/navbar'
import Footer from '@/components/molecules/footer'
import PageHeader from '@/components/pageHeader'
import { statsColumns } from '@/constants'
import { headers } from 'next/headers'
import ColumnCards from '@/components/columnCards'
import { PageContainer } from '@/components/atoms/pageContainer'
import Link from '@/components/atoms/link'
import ColumnCardsWithControls from '@/components/columnCardsWithControls'
import Info from '@/components/atoms/info'
import PlayerFinderWithResult from '@/components/organisms/playerFinderWithResult'
import BestGames from '@/components/bestGames'
import { GamesStats } from '@/interfaces/game'

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

interface GameStatsData {
  error: string | null
  data: GamesStats
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

async function fetchGameTimes(): Promise<GameStatsData> {
  const headersList = headers()
  const protocol = headersList.get('x-forwarded-proto') || 'http'
  const host = headersList.get('host')
  const url = `${protocol}://${host}`

  const response = await fetch(`${url}/api/gameTimes`)
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
  const { data: gameData, error: gameError } = await fetchGameTimes()

  return (
    <ThemeProvider>
      <Navbar />
      <main>
        {error || gameError ? (
          <Error />
        ) : (
          <>
            <PageHeader
              description="Best times and scores of Run Kitty Run players. The scores shown on this page are subject to the files uploaded by the players, if a player is not present in this table it is because they have not uploaded their statistics in the latest versions of the game"
              title="Leaderboard"
            />
            <PageContainer>
              <PlayerFinderWithResult />
            </PageContainer>
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
            <PageContainer
              ariaLabelledby="columns-best-games-title"
              title="Best game times"
              marginTop={32}
            >
              <BestGames games={gameData} />
            </PageContainer>
            <Table
              columns={statsColumns}
              data={data.scoreboard}
              title="Leaderboard Highlights: Top Five Stats"
            />
            <PageContainer as="div" marginBottom={48}>
              <Link
                colorName="tertiary"
                href="/stats/overview?page=1&sortKey=completedChallenges&sortOrder=desc"
                withButtonStyle
              >
                View all stats
              </Link>
            </PageContainer>
            <Info as="ul">
              <li>
                <strong>Can&apos;t find your stats?</strong>{' '}
                <Link
                  colorName="tertiary"
                  href="/guide"
                  aria-label="Go to guide"
                >
                  Click here
                </Link>{' '}
                to learn how to upload your game progress and get featured on
                the leaderboard!
              </li>
              <li>
                Don&apos;t want your BattleTag displayed on this page? Join our{' '}
                <Link
                  colorName="tertiary"
                  href="https://discord.com/channels/873715731873804298/1344673409468207186"
                  aria-label="Discord server"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Discord server
                </Link>{' '}
                and contact a member with the &quot;Developer&quot; tag to
                request it to be anonymized.
              </li>
            </Info>
          </>
        )}
      </main>
      <Footer />
    </ThemeProvider>
  )
}
