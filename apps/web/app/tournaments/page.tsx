import Error from '@rkr/dls/components/molecules/error'
import Tournaments from '@rkr/dls/components/templates/tournaments'
import { tournamentsFullApi } from '@rkr/dls/constants'

async function fetchData() {
  const response = await fetch(tournamentsFullApi, {
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

export default async function TournamentsPage() {
  const { data, error } = await fetchData()

  return <main>{error ? <Error /> : data && <Tournaments data={data} />}</main>
}
