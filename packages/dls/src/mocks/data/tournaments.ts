import { TournamentFull, TournamentTeamMember } from '@/interfaces/tournament'

export const mockTournaments: TournamentFull[] = []

export const makeTournament = (
  options: { members?: TournamentTeamMember[] } = {},
): TournamentFull => ({
  tournament: {
    id: 1,
    tournament_id: 'T1',
    region: 'EU',
    gamemode: 'standard',
    game_type: 'ranked',
    datetime: '2025-01-01 00:00:00',
    admin_approved: 1,
    tournament_group_id: 42,
  },
  teams: [
    {
      id: 'red',
      color: 'red',
      totalTime: 0,
      games: [],
      members: options.members ?? [],
    },
  ],
})

export const makePlayer = (
  battleTag: string,
  rounds: { round_number: number; round_time: number }[],
): TournamentTeamMember => ({
  battleTag: {
    name: battleTag.split('#')[0],
    tag: battleTag,
  },
  totalTime: rounds.reduce((sum, r) => sum + r.round_time, 0),
  games: [
    {
      game_number: 1,
      total_deaths: 0,
      total_saves: 5,
      total_progress: 100,
      totalTime: rounds.reduce((sum, r) => sum + r.round_time, 0),
      rounds: rounds.map((r) => ({
        round_number: r.round_number,
        deaths: 0,
        level: 1,
        progress: 100,
        round_time: r.round_time,
        saves: 1,
      })),
    },
  ],
})
