import { TournamentTeam } from '@/interfaces/tournament'
import { makePlayer } from '@/mocks/data/tournaments'
import { formatTournamentTeams } from '..'

const makeTeam = (
  members: ReturnType<typeof makePlayer>[] = [],
): TournamentTeam => ({
  id: 'red',
  color: 'red',
  totalTime: 0,
  games: [],
  members,
})

describe('formatTournamentTeams', () => {
  it('returns an empty array when given no teams', () => {
    expect(formatTournamentTeams([])).toEqual([])
  })

  it('preserves team shape and computes totalTime per member', () => {
    const teams = [
      makeTeam([makePlayer('Alpha#1', [{ round_number: 1, round_time: 300 }])]),
    ]

    const result = formatTournamentTeams(teams)

    expect(result[0].members[0].totalTime).toBe(300)
  })

  it('sums round_time across all rounds in a game', () => {
    const teams = [
      makeTeam([
        makePlayer('Alpha#1', [
          { round_number: 1, round_time: 100 },
          { round_number: 2, round_time: 200 },
        ]),
      ]),
    ]

    const result = formatTournamentTeams(teams)
    const game = result[0].members[0].games[0]

    expect(game.totalTime).toBe(300)
  })

  it('sums totalTime across all games for a member', () => {
    const member = makePlayer('Alpha#1', [{ round_number: 1, round_time: 100 }])
    member.games.push({
      game_number: 2,
      total_deaths: 0,
      total_saves: 2,
      total_progress: 80,
      rounds: [
        {
          round_number: 1,
          deaths: 0,
          level: 1,
          progress: 80,
          round_time: 150,
          saves: 1,
        },
      ],
    })

    const teams = [makeTeam([member])]
    const result = formatTournamentTeams(teams)

    expect(result[0].members[0].totalTime).toBe(250)
  })

  it('handles a member with no games', () => {
    const member = makePlayer('Alpha#1', [])
    member.games = []
    const teams = [makeTeam([member])]

    const result = formatTournamentTeams(teams)

    expect(result[0].members[0].totalTime).toBe(0)
  })

  it('handles a team with no members', () => {
    const teams = [makeTeam()]

    const result = formatTournamentTeams(teams)

    expect(result[0].members).toEqual([])
  })

  it('processes multiple teams independently', () => {
    const teams = [
      makeTeam([makePlayer('Alpha#1', [{ round_number: 1, round_time: 100 }])]),
      makeTeam([makePlayer('Beta#2', [{ round_number: 1, round_time: 200 }])]),
    ]

    const result = formatTournamentTeams(teams)

    expect(result[0].members[0].totalTime).toBe(100)
    expect(result[1].members[0].totalTime).toBe(200)
  })

  it('does not mutate the input teams', () => {
    const original = makeTeam([
      makePlayer('Alpha#1', [{ round_number: 1, round_time: 100 }]),
    ])
    const originalMemberTotalTime = original.members[0].totalTime

    formatTournamentTeams([original])

    expect(original.members[0].totalTime).toBe(originalMemberTotalTime)
  })
})
