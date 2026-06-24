import { formatTournamentPlayers } from '..'
import { ApiTournament } from '@/interfaces/tournament'

const makeTournament = (
  overrides: Partial<ApiTournament> = {},
): ApiTournament => ({
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

const makePlayer = (
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

describe('formatTournamentPlayers', () => {
  it('maps tournament fields and converts game_type / tournament_group_id', () => {
    const result = formatTournamentPlayers(makeTournament())

    expect(result.tournament).toMatchObject({
      id: 1,
      region: 'EU',
      gameType: 'ranked',
      groupId: 42,
    })
  })

  it('returns an empty players array when players is missing', () => {
    const item = makeTournament()
    // @ts-expect-error intentional bad input
    item.players = null

    const result = formatTournamentPlayers(item)

    expect(result.players).toEqual([])
  })

  it('splits battleTag string into name and tag', () => {
    const item = makeTournament({
      players: [
        makePlayer('Alpha#1234', [{ round_number: 1, round_time: 100 }]),
      ],
    })

    const result = formatTournamentPlayers(item)

    expect(result.players[0].battleTag).toEqual({
      name: 'Alpha',
      tag: 'Alpha#1234',
    })
  })

  it('sorts players by totalTime ascending', () => {
    const item = makeTournament({
      players: [
        makePlayer('Slow#1', [{ round_number: 1, round_time: 500 }]),
        makePlayer('Fast#2', [{ round_number: 1, round_time: 200 }]),
        makePlayer('Mid#3', [{ round_number: 1, round_time: 350 }]),
      ],
    })

    const result = formatTournamentPlayers(item)
    const names = result.players.map((p) =>
      typeof p.battleTag === 'string' ? p.battleTag : p.battleTag.name,
    )

    expect(names).toEqual(['Fast', 'Mid', 'Slow'])
  })

  it('tracks the fastest round time across players', () => {
    const item = makeTournament({
      players: [
        makePlayer('Alpha#1234', [{ round_number: 1, round_time: 80 }]),
        makePlayer('Beta#5678', [{ round_number: 1, round_time: 60 }]),
      ],
    })

    const result = formatTournamentPlayers(item)

    expect(result.fastestRounds.roundOne).toMatchObject({
      time: 60,
      player: { name: 'Beta', tag: 'Beta#5678' },
    })
  })

  it('tracks fastest rounds independently per round number', () => {
    const item = makeTournament({
      players: [
        makePlayer('Alpha#1234', [
          { round_number: 1, round_time: 50 },
          { round_number: 2, round_time: 200 },
        ]),
        makePlayer('Beta#5678', [
          { round_number: 1, round_time: 100 },
          { round_number: 2, round_time: 80 },
        ]),
      ],
    })

    const result = formatTournamentPlayers(item)

    expect(result.fastestRounds.roundOne.player.name).toBe('Alpha')
    expect(result.fastestRounds.roundTwo.player.name).toBe('Beta')
  })

  it('ignores round times of 0', () => {
    const item = makeTournament({
      players: [
        makePlayer('Alpha#1234', [{ round_number: 1, round_time: 0 }]),
        makePlayer('Beta#5678', [{ round_number: 1, round_time: 120 }]),
      ],
    })

    const result = formatTournamentPlayers(item)

    expect(result.fastestRounds.roundOne).toMatchObject({
      time: 120,
      player: { name: 'Beta' },
    })
  })

  it('leaves fastestRounds at Infinity when no valid round times exist', () => {
    const item = makeTournament({
      players: [makePlayer('Alpha#1234', [{ round_number: 1, round_time: 0 }])],
    })

    const result = formatTournamentPlayers(item)

    expect(result.fastestRounds.roundTwo.time).toBe(Number.POSITIVE_INFINITY)
  })

  it('handles a player with no games gracefully', () => {
    const item = makeTournament({
      players: [
        {
          battleTag: 'Ghost#9999',
          totalTime: 0,
          games: [],
        },
      ],
    })

    expect(() => formatTournamentPlayers(item)).not.toThrow()
    expect(formatTournamentPlayers(item).players).toHaveLength(1)
  })
})
