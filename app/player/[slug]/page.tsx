import Error from '@/components/molecules/error'
import PlayerDashboard from '@/components/templates/playerDashboard'
import { Player } from '@/interfaces/player'
import { notFound } from 'next/navigation'
import { apiUrl } from '@/constants'

interface PlayerStatsData {
  error: string | null
  data: Player | null
}

async function fetchData(battleTag: string): Promise<PlayerStatsData> {
  const response = await fetch(
    `${apiUrl}/api/Players/summary?battleTag=${encodeURIComponent(battleTag)}`,
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
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { data, error } = await fetchData(decodeURIComponent(slug))

  return (
    <main>
      {error ? <Error /> : data && <PlayerDashboard playerData={data} />}
    </main>
  )
}
