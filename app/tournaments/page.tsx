import Error from '@/components/molecules/error'
import Tournaments from '@/components/templates/tournaments'
import { getBaseUrlFromHeaders } from '@/utils'

async function fetchData() {
  const url = await getBaseUrlFromHeaders()

  const response = await fetch(`${url}/api/tournaments`)
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

export default async function TournamentsPage() {
  const { data, error } = await fetchData()

  return <main>{error ? <Error /> : data && <Tournaments data={data} />}</main>
}
