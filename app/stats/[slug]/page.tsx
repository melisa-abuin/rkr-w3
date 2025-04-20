import Footer from '@/components/molecules/footer'
import Navbar from '@/components/molecules/navbar'
import PageHeader from '@/components/atoms/pageHeader'
import { kibbleColumns, statsColumns, timeAllDiffColumns } from '@/constants'
import { ThemeProvider } from '@/hooks/useTheme'
import { PlayersStats } from '@/interfaces/player'
import { headers } from 'next/headers'
import Error from '@/components/molecules/error'
import TableWithControls from '@/components/organisms/tableWithControls'
import HelpInfo from '@/components/molecules/helpInfo'
import { PageContainer } from '@/components/atoms/pageContainer'
import { ToastProvider } from '@/hooks/useToast'
import Tabs from '@/components/atoms/tabs'
import KibbleTableWithControls from '@/components/organisms/kibbleTableWithControls'

interface PlayerStatsData {
  error: string | null
  data: { pages: number; stats?: PlayersStats }
}

const timeStrings = {
  title: 'Time stats',
  description: 'Check all the time-based stats',
  columns: timeAllDiffColumns,
  defaultSortKey: 'roundOne',
  apiBaseUrl: 'times',
} as const

const overallStrings = {
  title: 'Overall stats',
  description: 'Check all the general stats for all players',
  columns: statsColumns,
  defaultSortKey: 'completedChallenges',
  apiBaseUrl: 'stats',
} as const

const kibbleStrings = {
  title: 'Kibble stats',
  description: 'Check all the kibble stats for all players',
  columns: kibbleColumns,
  defaultSortKey: 'collectedSingleGame',
  apiBaseUrl: 'kibbleStats',
} as const

const pageVariants = {
  overview: overallStrings,
  time: timeStrings,
  kibble: kibbleStrings,
} as const

async function fetchData(
  apiBaseUrl: 'kibbleStats' | 'times' | 'stats',
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

  const slugUrl = `${url}/api/${apiBaseUrl}`

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

type VariantKey = keyof typeof pageVariants

const isValidVariant = (slug: string): slug is VariantKey =>
  slug in pageVariants

export default async function StatsPage({ params, searchParams }: PageProps) {
  const { slug } = params
  const pageVariant = isValidVariant(slug)
    ? pageVariants[slug]
    : pageVariants['overview']

  const { data, error } = await fetchData(pageVariant.apiBaseUrl, searchParams)
  const variantValues = Object.values(pageVariants)

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
              <PageContainer>
                <Tabs
                  defaultSelectedIndex={variantValues.findIndex(
                    ({ title }) => title === pageVariant.title,
                  )}
                  titles={variantValues.map(({ title }) => title)}
                >
                  {variantValues.map(
                    ({ title, columns, defaultSortKey, apiBaseUrl }, index) => {
                      if (title === 'Kibble stats') {
                        return (
                          <KibbleTableWithControls
                            key={index}
                            columns={columns}
                            data={{
                              ...data,
                              stats: data.stats?.map((elem) => ({
                                battleTag: elem.battleTag,
                                ...elem.kibbles,
                              })),
                            }}
                            defaultSortKey={defaultSortKey}
                            apiBaseUrl={apiBaseUrl}
                            title={title}
                          />
                        )
                      }
                      return (
                        <TableWithControls
                          key={index}
                          columns={columns}
                          data={data}
                          defaultSortKey={defaultSortKey}
                          apiBaseUrl={apiBaseUrl}
                          title={title}
                        />
                      )
                    },
                  )}
                </Tabs>
              </PageContainer>
              <HelpInfo />
            </>
          )}
        </main>
        <Footer />
      </ToastProvider>
    </ThemeProvider>
  )
}
