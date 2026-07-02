import Error from '@/components/molecules/error'
import TournamentDetail from '@/components/templates/tournamentDetail'
import { tournamentsBaseApi } from '@/constants'
import { formatTournamentPlayers } from '@/utils'

async function fetchData(id: string) {
  const response = await fetch(`${tournamentsBaseApi}/${id}/full`, {
    next: { revalidate: 480 },
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

export default async function TournamentsPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { data, error } = await fetchData(slug)

  const tournament = data ? formatTournamentPlayers(data) : null

  return (
    <main>
      {error ? <Error /> : tournament && <TournamentDetail data={tournament} />}
    </main>
  )
}
