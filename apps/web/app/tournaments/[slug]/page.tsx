import Error from '@rkr/dls/components/molecules/error'
import TournamentDetail from '@rkr/dls/components/templates/tournamentDetail'
import { tournamentsFullApi } from '@rkr/dls/constants'
import { formatTournamentPlayers } from '@rkr/dls/utils'

async function fetchData(id: string) {
  const response = await fetch(`${tournamentsFullApi}?id=${id}`, {
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

  const tournament = data ? formatTournamentPlayers(data.tournaments) : null

  return (
    <main>
      {error ? <Error /> : tournament && <TournamentDetail data={tournament} />}
    </main>
  )
}
