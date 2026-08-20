import {
  TournamentTeam,
  TournamentTeamMember,
  TournamentTeamMemberGame,
} from '@/interfaces/tournament'

const computeGameTotalTime = (
  game: TournamentTeamMemberGame,
): TournamentTeamMemberGame => ({
  ...game,
  totalTime: game.rounds.reduce((sum, round) => sum + round.round_time, 0),
})

const formatTeamMember = (
  member: TournamentTeamMember,
): TournamentTeamMember => {
  const games = member.games.map(computeGameTotalTime)
  return {
    ...member,
    games,
    totalTime: games.reduce((sum, game) => sum + (game.totalTime ?? 0), 0),
  }
}

export const formatTournamentTeams = (
  teams: TournamentTeam[],
): TournamentTeam[] =>
  teams.map((team) => ({
    ...team,
    members: team.members.map(formatTeamMember),
  }))
