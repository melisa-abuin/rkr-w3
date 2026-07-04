import { Tournament, Tournaments } from '@/interfaces/tournament'

export const groupTournamentsByGroupId = (
  tournaments: Tournament[],
): Tournaments[] => {
  const grouped: Record<number, Tournaments> = {}
  const result: Tournaments[] = []

  tournaments.forEach((item) => {
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
