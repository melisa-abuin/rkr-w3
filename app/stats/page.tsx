import Footer from '@/components/molecules/footer'
import Navbar from '@/components/molecules/navbar'
import { ThemeProvider } from '@/hooks/useTheme'
import { Player } from '@/interfaces/player'
import { headers } from 'next/headers'
import Error from '@/components/molecules/error'
import { ToastProvider } from '@/hooks/useToast'
import Stats from '@/components/templates/stats'

interface PlayerStatsData {
  error: string | null
  data: { pages: number; stats?: Player[] }
}

async function fetchData(
  searchParams?: Record<string, string | string[] | undefined>,
): Promise<PlayerStatsData> {
  const queryString = new URLSearchParams(
    searchParams as Record<string, string>,
  ).toString()

  const filter = searchParams?.filter

  const headersList = headers()
  const protocol = headersList.get('x-forwarded-proto') || 'http'
  const host = headersList.get('host')

  // workaround for feature instances
  const isStage = process.env.ENVIRONMENT === 'stage'
  const url = isStage ? 'https://rkr-w3.vercel.app' : `${protocol}://${host}`

  const slugUrl = `${url}/api/${filter}`

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

  const { data, error } = await fetchData(searchParams)

  return (
    <ThemeProvider>
      <ToastProvider>
        <Navbar />
        <main>{error ? <Error /> : <Stats data={data} slug={slug} />}</main>
        <Footer />
      </ToastProvider>
    </ThemeProvider>
  )
}
