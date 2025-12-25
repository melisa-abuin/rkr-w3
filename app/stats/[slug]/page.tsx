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
  apiBaseUrl: 'kibbleStats' | 'times' | 'stats',
  searchParams?: Record<string, string | string[] | undefined>,
): Promise<PlayerStatsData> {
  const queryString = new URLSearchParams(
    searchParams as Record<string, string>,
  ).toString()

  const headersList = headers()
  const protocol = (await headersList).get('x-forwarded-proto') || 'http'
  const host = (await headersList).get('host')

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

const apiBaseUrls = {
  overview: 'stats',
  time: 'times',
  kibble: 'kibbleStats',
} as const

type VariantKey = keyof typeof apiBaseUrls

const isValidVariant = (slug: string): slug is VariantKey => slug in apiBaseUrls

export default async function StatsPage({ params, searchParams }: PageProps) {
  const { slug } = params

  const apiBaseUrl = isValidVariant(slug)
    ? apiBaseUrls[slug]
    : apiBaseUrls['overview']

  const { data, error } = await fetchData(apiBaseUrl, searchParams)

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
