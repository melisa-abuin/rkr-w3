import { makePlayer, makeTournament } from '@/mocks/data/tournaments'
import { formatTournamentPlayers } from '..'

describe('formatTournamentPlayers', () => {
  it('maps tournament fields and converts game_type / tournament_group_id', () => {
    const result = formatTournamentPlayers([makeTournament()])

    expect(result.tournament).toMatchObject({
      id: 1,
      region: 'EU',
      gameType: 'ranked',
      groupId: 42,
    })
  })

  it('returns an empty members array when members is missing', () => {
    const item = makeTournament()

    const result = formatTournamentPlayers([item])

    expect(result.teams[0].members).toEqual([])
  })

  it('preserves battleTag object shape', () => {
    const item = makeTournament({
      members: [
        makePlayer('Alpha#1234', [{ round_number: 1, round_time: 100 }]),
      ],
    })

    const result = formatTournamentPlayers([item])

    expect(result.teams[0].members[0].battleTag).toEqual({
      name: 'Alpha',
      tag: 'Alpha#1234',
    })
  })

  it('sorts members by totalTime ascending', () => {
    const item = makeTournament({
      members: [
        makePlayer('Slow#1', [{ round_number: 1, round_time: 500 }]),
        makePlayer('Fast#2', [{ round_number: 1, round_time: 200 }]),
        makePlayer('Mid#3', [{ round_number: 1, round_time: 350 }]),
      ],
    })

    const result = formatTournamentPlayers([item])
    const names = result.teams[0].members.map((m) => m.battleTag.name)

    expect(names).toEqual(['Fast', 'Mid', 'Slow'])
  })

  it('tracks the fastest round time across members', () => {
    const item = makeTournament({
      members: [
        makePlayer('Alpha#1234', [{ round_number: 1, round_time: 80 }]),
        makePlayer('Beta#5678', [{ round_number: 1, round_time: 60 }]),
      ],
    })

    const result = formatTournamentPlayers([item])

    expect(result.fastestRounds?.roundOne).toMatchObject({
      time: 60,
      player: { name: 'Beta', tag: 'Beta#5678' },
    })
  })

  it('tracks fastest rounds independently per round number', () => {
    const item = makeTournament({
      members: [
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

    const result = formatTournamentPlayers([item])

    expect(result.fastestRounds?.roundOne.player.name).toBe('Alpha')
    expect(result.fastestRounds?.roundTwo.player.name).toBe('Beta')
  })

  it('ignores round times of 0', () => {
    const item = makeTournament({
      members: [
        makePlayer('Alpha#1234', [{ round_number: 1, round_time: 0 }]),
        makePlayer('Beta#5678', [{ round_number: 1, round_time: 120 }]),
      ],
    })

    const result = formatTournamentPlayers([item])

    expect(result.fastestRounds?.roundOne).toMatchObject({
      time: 120,
      player: { name: 'Beta' },
    })
  })

  it('leaves fastestRounds at Infinity when no valid round times exist', () => {
    const item = makeTournament({
      members: [makePlayer('Alpha#1234', [{ round_number: 1, round_time: 0 }])],
    })

    const result = formatTournamentPlayers([item])

    expect(result.fastestRounds?.roundTwo.time).toBe(Number.POSITIVE_INFINITY)
  })

  it('handles a member with no games gracefully', () => {
    const item = makeTournament({
      members: [
        {
          battleTag: { name: 'Ghost', tag: 'Ghost#9999' },
          totalTime: 0,
          games: [],
        },
      ],
    })

    expect(() => formatTournamentPlayers([item])).not.toThrow()
    expect(formatTournamentPlayers([item]).teams[0].members).toHaveLength(1)
  })
})
