import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import PageHeader from '@/components/pageHeader'
import { statsColumns, timeAllDiffColumns } from '@/constants'
import { ThemeProvider } from '@/hooks/useTheme'
import { PlayersStats } from '@/interfaces/player'
import { headers } from 'next/headers'
import Error from '@/components/error'
import TableWithControls from '@/components/tableWithControls'
import ScoreboardSelector from '@/components/scoreboardSelector'
import Info from '@/components/atoms/info'
import Link from '@/components/link'

interface PlayerStatsData {
  error: string | null
  data: PlayersStats
}

const timeStrings = {
  title: 'Time stats',
  description: 'Check all the time-based stats',
  columns: timeAllDiffColumns,
  defaultSortKey: 'roundOne',
  link: {
    ariaLabel: 'View all stats for all players',
    href: '/stats/overview',
    text: 'View all stats',
  },
} as const

const overallStrings = {
  title: 'Overall stats',
  description: 'Check all the general stats for all players',
  columns: statsColumns,
  defaultSortKey: 'completedChallenges',
  link: {
    ariaLabel: 'View all times for all players',
    href: '/stats/time',
    text: 'View time related stats',
  },
} as const

async function fetchData(shouldGetTimes: boolean): Promise<PlayerStatsData> {
  const headersList = headers()
  const protocol = headersList.get('x-forwarded-proto') || 'http'
  const host = headersList.get('host')
  const url = `${protocol}://${host}`

  const response = await fetch(
    `${url}/api/${shouldGetTimes ? 'times' : 'stats'}`,
  )
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

export default async function StatsPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const { data, error } = await fetchData(slug === 'time')

  const strings = slug === 'time' ? timeStrings : overallStrings

  return (
    <ThemeProvider>
      <Navbar />
      <main>
        {error ? (
          <Error />
        ) : (
          <>
            <PageHeader
              description="Overall times and scores of Run Kitty Run players. The scores shown on this page are subject to the files uploaded by the players, if a player is not present in this table it is because they have not uploaded their statistics in the latest versions of the game"
              title="Scoreboard"
            />
            <ScoreboardSelector toggleInitialValue={slug === 'overview'} />
            <TableWithControls
              columns={strings.columns}
              data={data}
              defaultSortKey={strings.defaultSortKey}
              title={strings.title}
            />
            <Info as="ul">
              <li>
                <strong>Can&apos;t find your stats?</strong>{' '}
                <Link href="/guide" aria-label="Go to guide">
                  Click here
                </Link>{' '}
                to learn how to upload your game progress and get featured on
                the leaderboard!
              </li>
              <li>
                Don&apos;t want your BattleTag displayed on this page? Join our{' '}
                <Link
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
