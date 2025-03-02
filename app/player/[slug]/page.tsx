import { ThemeProvider } from '@/hooks/useTheme'
import { DetailedPlayerStats } from '@/interfaces/player'
import { headers } from 'next/headers'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import Error from '@/components/error'
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

  const response = await fetch(`${url}/api/player`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ battleTag }),
  })
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
