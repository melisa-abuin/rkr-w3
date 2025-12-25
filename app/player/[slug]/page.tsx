import Error from '@/components/molecules/error'
import Footer from '@/components/molecules/footer'
import Navbar from '@/components/molecules/navbar'
import PlayerDashboard from '@/components/templates/playerDashboard'
import { ThemeProvider } from '@/hooks/useTheme'
import { Player } from '@/interfaces/player'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { ToastProvider } from '@/hooks/useToast'

interface PlayerStatsData {
  error: string | null
  data: Player | null
}

async function fetchData(battleTag: string): Promise<PlayerStatsData> {
  const headersList = headers()
  const protocol = (await headersList).get('x-forwarded-proto') || 'http'
  const host = (await headersList).get('host')

  // workaround for feature instances
  const isStage = process.env.ENVIRONMENT === 'stage'
  const url = isStage ? 'https://rkr-w3.vercel.app' : `${protocol}://${host}`

  const response = await fetch(
    `${url}/api/player/${encodeURIComponent(battleTag)}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )

  if (response.status === 200) {
    return {
      data: await response.json(),
      error: null,
    }
  } else if (response.status === 404) {
    notFound()
  }

  return {
    data: null,
    error: 'Something went wrong',
  }
}

export default async function PlayerPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const { data, error } = await fetchData(slug)

  return (
    <ThemeProvider>
      <ToastProvider>
        <Navbar />
        <main>
          {error ? <Error /> : data && <PlayerDashboard playerData={data} />}
        </main>
        <Footer />
      </ToastProvider>
    </ThemeProvider>
  )
}
