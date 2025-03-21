import { ThemeProvider } from '@/hooks/useTheme'
import { DetailedPlayerStats } from '@/interfaces/player'
import { headers } from 'next/headers'
import Footer from '@/components/molecules/footer'
import Navbar from '@/components/molecules/navbar'
import Error from '@/components/molecules/error'
import PlayerDashboard from '@/components/templates/playerDashboard'

interface PlayerStatsData {
  error: string | null
  data: DetailedPlayerStats | null
}

async function fetchData(battleTag: string): Promise<PlayerStatsData> {
  const headersList = headers()
  const protocol = headersList.get('x-forwarded-proto') || 'http'
  const host = headersList.get('host')
  const url = `${protocol}://${host}`

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
      <Navbar />
      <main>
        {error ? <Error /> : data && <PlayerDashboard playerData={data} />}
      </main>
      <Footer />
    </ThemeProvider>
  )
}
