import Error from '@/components/molecules/error'
import TournamentDetail from '@/components/templates/tournamentDetail'
import { getBaseUrlFromHeaders } from '@/utils'

async function fetchData(id: string) {
  const url = await getBaseUrlFromHeaders()

  const response = await fetch(`${url}/api/tournamentDetail/${id}`)
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

  return (
    <main>{error ? <Error /> : data && <TournamentDetail data={data} />}</main>
  )
}
