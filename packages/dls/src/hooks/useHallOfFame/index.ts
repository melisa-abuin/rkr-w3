import { seasonsPodiumApi } from '@/constants'
import { useApiQuery } from '@/hooks/useApiQuery'
import { LeagueSeasonsPodiumApiResponse } from '@/interfaces/league'

export function useHallOfFame() {
  const { data, isLoading } =
    useApiQuery<LeagueSeasonsPodiumApiResponse>(seasonsPodiumApi)

  return { seasons: data?.seasons ?? [], isLoading }
}
