import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import PageHeader from '@/components/pageHeader'
import { statsColumns, timeAllDiffColumns } from '@/constants'
import { ThemeProvider } from '@/hooks/useTheme'
import { PlayersStats } from '@/interfaces/player'
import { headers } from 'next/headers'
import Error from '@/components/error'
import TableWithControls from '@/components/tableWithControls'

interface PlayerStatsData {
  error: string | null
  data: PlayersStats
}

const timeStrings = {
  title: 'All time stats',
  description: 'Check all the time-based stats',
  columns: timeAllDiffColumns,
}

const overallStrings = {
  title: 'Overall stats',
  description: 'Check all the general stats for all players',
  columns: statsColumns,
}

async function fetchData(): Promise<PlayerStatsData> {
  const headersList = headers()
  const protocol = headersList.get('x-forwarded-proto') || 'http'
  const host = headersList.get('host')
  const url = `${protocol}://${host}`

  const response = await fetch(`${url}/api/stats`, {
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

export default async function StatsPage({
  params,
}: {
  params: { slug: string }
}) {
  const { data, error } = await fetchData()

  const { slug } = params

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
              title="Overall Stats"
            />
          </>
        )}
      </main>
      <Footer />
    </ThemeProvider>
  )
}
