import { ApiTournament, ApiTournaments } from '@/interfaces/tournament'

export const groupTournamentsByGroupId = (
  tournaments: ApiTournament[],
): ApiTournaments[] => {
  const grouped: Record<number, ApiTournaments> = {}
  const result: ApiTournaments[] = []

  tournaments
    .filter((item) => item.tournament.admin_approved !== 0)
    .forEach((item) => {
      const groupId = item.tournament.tournament_group_id

      if (groupId === null || groupId === undefined) {
        result.push([item])
        return
      }

      if (!grouped[groupId]) {
        grouped[groupId] = []
        result.push(grouped[groupId])
      }

      grouped[groupId].push(item)
    })

  return result
}
