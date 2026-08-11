import Error from '@rkr/dls/components/molecules/error'
import Stats from '@rkr/dls/components/templates/stats'
import {
  defaultScoreboardFilter,
  playerStatsApi,
  seasonsApi,
  seasonScoreboardApi,
} from '@rkr/dls/constants'
import {
  LeagueScoreboardApiResponse,
  LeagueSeasonsApiResponse,
} from '@rkr/dls/interfaces/league'
import { Player } from '@rkr/dls/interfaces/player'
import { buildSearchQuery } from '@rkr/dls/utils'

type SearchParams = Record<string, string | string[] | undefined>

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams?: Promise<SearchParams>
}

async function fetchPageData(filter: string | undefined, params: SearchParams) {
  const isBreakdown = filter === 'breakdown'

  async function getSeasons() {
    const res = await fetch(seasonsApi, { next: { revalidate: 480 } })
    if (!res.ok) return { seasonOptions: [], seasonScoreboard: [] }

    const seasons = (await res.json()) as LeagueSeasonsApiResponse
    const now = Date.now()
    const seasonParam = Array.isArray(params.season)
      ? params.season[0]
      : params.season

    const selected = seasonParam
      ? (seasons.find((s) => s.id.toString() === seasonParam) ?? seasons[0])
      : (seasons.find(
          (s) =>
            now >= new Date(s.startDate).getTime() &&
            now <= new Date(s.endDate).getTime(),
        ) ?? seasons[0])

    const seasonOptions = seasons.map(({ id, leagueId }) => ({
      label: leagueId,
      value: id.toString(),
    }))

    if (!isBreakdown) return { seasonOptions, seasonScoreboard: [] }

    const pageParam = Array.isArray(params.page) ? params.page[0] : params.page
    const scoreboardRes = await fetch(
      seasonScoreboardApi(
        selected.id,
        pageParam ? Number(pageParam) : undefined,
      ),
      {
        next: { revalidate: 480 },
      },
    )

    const scoreboardJson = scoreboardRes.ok
      ? ((await scoreboardRes.json()) as {
          pages: number
          stats: LeagueScoreboardApiResponse
        })
      : null

    return {
      seasonOptions,
      seasonScoreboard: scoreboardJson?.stats ?? [],
      pages: scoreboardJson?.pages ?? 1,
    }
  }

  async function getPlayerStats() {
    const queryString = buildSearchQuery(params)
    const res = await fetch(
      `${playerStatsApi}/${filter || defaultScoreboardFilter}${queryString}`,
      { next: { revalidate: 480 } },
    )
    if (res.ok)
      return {
        data: (await res.json()) as { pages: number; stats?: Player[] },
        error: null,
      }
    return {
      data: { pages: 1, stats: [] as Player[] },
      error: 'Something went wrong',
    }
  }

  try {
    if (isBreakdown) {
      const { seasonOptions, seasonScoreboard, pages } = await getSeasons()
      return {
        data: { pages: pages ?? 1, stats: seasonScoreboard },
        seasonOptions,
        error: null,
      }
    }

    const [{ data, error }, { seasonOptions }] = await Promise.all([
      getPlayerStats(),
      getSeasons(),
    ])
    return { data, seasonOptions, error }
  } catch {
    return {
      data: { pages: 1, stats: [] },
      seasonOptions: [],
      error: 'Something went wrong',
    }
  }
}

export default async function StatsPage({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {}
  const filterParam = params.filter
  const filter = Array.isArray(filterParam) ? filterParam[0] : filterParam

  const { data, error, seasonOptions } = await fetchPageData(filter, params)
  console.log(error)
  return (
    <main>
      {error ? (
        <Error />
      ) : (
        <Stats
          data={data}
          filter={filter?.toString() || defaultScoreboardFilter}
          seasonOptions={seasonOptions}
        />
      )}
    </main>
  )
}
