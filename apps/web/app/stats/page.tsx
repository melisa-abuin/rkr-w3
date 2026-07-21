import Error from '@rkr/dls/components/molecules/error'
import Stats from '@rkr/dls/components/templates/stats'
import { defaultScoreboardFilter, playerStatsApi } from '@rkr/dls/constants'
import { Player } from '@rkr/dls/interfaces/player'
import { buildSearchQuery } from '@rkr/dls/utils'

interface PlayerStatsData {
  error: string | null
  data: { pages: number; stats?: Player[] }
}

type SearchParams = Record<string, string | string[] | undefined>

async function fetchData(
  filter: string | undefined,
  params: SearchParams,
): Promise<PlayerStatsData> {
  const queryString = buildSearchQuery(params)
  const slugUrl = `${playerStatsApi}/${filter || defaultScoreboardFilter}`

  const response = await fetch(`${slugUrl}${queryString}`, {
    next: { revalidate: 480 },
  })

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
  params: Promise<{
    slug: string
  }>
  searchParams?: Promise<SearchParams>
}

export default async function StatsPage({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {}
  const filterParam = params.filter
  const filter = Array.isArray(filterParam) ? filterParam[0] : filterParam

  const { data, error } = await fetchData(filter, params)

  return (
    <main>
      {error ? (
        <Error />
      ) : (
        <Stats
          data={data}
          filter={filter?.toString() || defaultScoreboardFilter}
        />
      )}
    </main>
  )
}
