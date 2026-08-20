import { TournamentFormatted, TournamentFull } from '@/interfaces/tournament'
import { formatTournamentTeams } from '../formatTournamentTeams'

const formatTournament = (item: TournamentFull): TournamentFormatted => ({
  tournament: {
    id: item.tournament.id,
    tournamentId: item.tournament.tournament_id,
    region: item.tournament.region,
    gamemode: item.tournament.gamemode,
    gameType: item.tournament.game_type,
    datetime: item.tournament.datetime,
    adminApproved: item.tournament.admin_approved,
    groupId: item.tournament.tournament_group_id,
  },
  teams: formatTournamentTeams(item.teams),
})

export const groupTournamentsByGroupId = (
  data: TournamentFull[],
): TournamentFormatted[][] => {
  const grouped: Record<number, TournamentFormatted[]> = {}
  const result: TournamentFormatted[][] = []

  data.forEach((item) => {
    const groupId = item.tournament.tournament_group_id
    const formatted = formatTournament(item)

    if (groupId === null || groupId === undefined) {
      result.push([formatted])
      return
    }

    if (!grouped[groupId]) {
      grouped[groupId] = []
      result.push(grouped[groupId])
    }

    grouped[groupId].push(formatted)
  })

  return result
}
