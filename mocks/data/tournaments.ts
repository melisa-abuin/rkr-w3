import { Tournament } from '@/interfaces/tournament'

export const mockTournaments: Tournament[] = []

export const makeTournament = (
  overrides: Partial<Tournament> = {},
): Tournament => ({
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
  players: [],
  ...overrides,
})

export const makePlayer = (
  battleTag: string,
  rounds: { round_number: number; round_time: number }[],
) => ({
  battleTag,
  totalTime: rounds.reduce((sum, r) => sum + r.round_time, 0),
  games: [
    {
      id: 1,
      tournament_id: 1,
      battleTag,
      game_number: 1,
      game_uid: 'g1',
      team: 'A',
      team_members: battleTag,
      total_deaths: 0,
      total_progress: 100,
      total_saves: 5,
      totalTime: rounds.reduce((sum, r) => sum + r.round_time, 0),
      rounds: rounds.map((r, i) => ({
        id: i + 1,
        game_id: 1,
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
