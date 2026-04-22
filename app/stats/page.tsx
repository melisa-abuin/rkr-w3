import Footer from '@/components/molecules/footer'
import Navbar from '@/components/molecules/navbar'
import { ThemeProvider } from '@/hooks/useTheme'
import { Player } from '@/interfaces/player'
import Error from '@/components/molecules/error'
import { ToastProvider } from '@/hooks/useToast'
import Stats from '@/components/templates/stats'
import { getBaseUrlFromHeaders } from '@/utils'
import '../../theme/light.css' // TODO: create hook for no styled components theming

interface PlayerStatsData {
  error: string | null
  data: { pages: number; stats?: Player[] }
}

type SearchParams = Record<string, string | string[] | undefined>

function buildSearchQuery(searchParams: SearchParams): string {
  const query = new URLSearchParams()

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value === undefined || key === 'filter') return

    if (Array.isArray(value)) {
      value.forEach((item) => query.append(key, item))
      return
    }

    query.set(key, value)
  })

  const queryString = query.toString()
  return queryString ? `?${queryString}` : ''
}

async function fetchData(
  searchParams?: Promise<SearchParams>,
): Promise<PlayerStatsData> {
  const params = (await searchParams) ?? {}
  const filterParam = params.filter
  const filter = Array.isArray(filterParam) ? filterParam[0] : filterParam
  const queryString = buildSearchQuery(params)

  const baseUrl = await getBaseUrlFromHeaders()

  const slugUrl = `${baseUrl}/api/${filter || 'stats'}`
  const response = await fetch(`${slugUrl}${queryString}`)
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
  params: Promise<{
    slug: string
  }>
  searchParams?: Promise<SearchParams>
}

export default async function StatsPage({ searchParams }: PageProps) {
  const { data, error } = await fetchData(searchParams)
  const params = (await searchParams) ?? {}
  const filterParam = params.filter
  const filter = Array.isArray(filterParam) ? filterParam[0] : filterParam

  return (
    <ThemeProvider>
      <ToastProvider>
        <Navbar />
        <main>
          {error ? (
            <Error />
          ) : (
            <Stats data={data} filter={filter?.toString() || 'stats'} />
          )}
        </main>
        <Footer />
      </ToastProvider>
    </ThemeProvider>
  )
}
