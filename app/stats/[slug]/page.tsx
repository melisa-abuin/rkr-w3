import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import PageHeader from '@/components/pageHeader'
import { statsColumns, timeAllDiffColumns } from '@/constants'
import { ThemeProvider } from '@/hooks/useTheme'
import { PlayersStats } from '@/interfaces/player'
import { headers } from 'next/headers'
import Error from '@/components/error'
import TableWithControls from '@/components/tableWithControls'
import Info from '@/components/info'
import Link from 'next/link'

interface PlayerStatsData {
  error: string | null
  data: PlayersStats
}

const timeStrings = {
  title: 'All time stats',
  description: 'Check all the time-based stats',
  columns: timeAllDiffColumns,
  defaultSortKey: 'roundOne',
  link: {
    ariaLabel: 'View all stats for players',
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
    ariaLabel: 'View all times for players',
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
              description={strings.description}
              title={strings.title}
            />
            <TableWithControls
              columns={strings.columns}
              data={data}
              defaultSortKey={strings.defaultSortKey}
              title="Overall Stats"
              headerLink={
                <Link
                  href={strings.link.href}
                  aria-label={strings.link.ariaLabel}
                >
                  {strings.link.text}
                </Link>
              }
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
