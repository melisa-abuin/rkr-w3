import Footer from '@/components/molecules/footer'
import Navbar from '@/components/molecules/navbar'
import PageHeader from '@/components/atoms/pageHeader'
import { statsColumns, timeAllDiffColumns } from '@/constants'
import { ThemeProvider } from '@/hooks/useTheme'
import { PlayersStats } from '@/interfaces/player'
import { headers } from 'next/headers'
import Error from '@/components/molecules/error'
import TableWithControls from '@/components/organisms/tableWithControls'
import ScoreboardSelector from '@/components/molecules/scoreboardSelector'
import HelpInfo from '@/components/molecules/helpInfo'
import { PageContainer } from '@/components/atoms/pageContainer'
import { ToastProvider } from '@/hooks/useToast'

interface PlayerStatsData {
  error: string | null
  data: { pages: number; stats?: PlayersStats }
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

async function fetchData(
  shouldGetTimes: boolean,
  searchParams?: Record<string, string | string[] | undefined>,
): Promise<PlayerStatsData> {
  const queryString = new URLSearchParams(
    searchParams as Record<string, string>,
  ).toString()

  const headersList = headers()
  const protocol = headersList.get('x-forwarded-proto') || 'http'
  const host = headersList.get('host')

  // workaround for feature instances
  const isStage = process.env.ENVIRONMENT === 'stage'
  const url = isStage ? 'https://rkr-w3.vercel.app' : `${protocol}://${host}`

  const slugUrl = `${url}/api/${shouldGetTimes ? 'times' : 'stats'}`

  const response = await fetch(
    `${slugUrl}${queryString ? `?${queryString}` : ''}`,
  )
  if (response.status === 200) {
    return {
      data: await response.json(),
      error: null,
    }
  }
  return {
    data: { pages: 1, stats: [] },
    error: 'Something went wrong',
  }
}

interface PageProps {
  params: {
    slug: string
  }
  searchParams?: Record<string, string | string[] | undefined>
}

export default async function StatsPage({ params, searchParams }: PageProps) {
  const { slug } = params
  const { data, error } = await fetchData(slug === 'time', searchParams)
  const strings = slug === 'time' ? timeStrings : overallStrings

  return (
    <ThemeProvider>
      <ToastProvider>
        <Navbar />
        <main>
          {error ? (
            <Error />
          ) : (
            <>
              <PageContainer>
                <PageHeader
                  description="Overall times and scores of Run Kitty Run players. The scores shown on this page are subject to the files uploaded by the players, if a player is not present in this table it is because they have not uploaded their statistics in the latest versions of the game"
                  title="Scoreboard"
                />
              </PageContainer>
              <ScoreboardSelector toggleInitialValue={slug === 'overview'} />
              <TableWithControls
                columns={strings.columns}
                data={data}
                defaultSortKey={strings.defaultSortKey}
                isTimeStats={slug === 'time'}
                title={strings.title}
              />
              <HelpInfo />
            </>
          )}
        </main>
        <Footer />
      </ToastProvider>
    </ThemeProvider>
  )
}
