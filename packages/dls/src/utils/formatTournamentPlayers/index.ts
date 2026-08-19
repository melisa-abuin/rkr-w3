import { TournamentFormatted, TournamentFull } from '@/interfaces/tournament'
import { formatTournamentTeams } from '../formatTournamentTeams'

export const roundNames = ['One', 'Two', 'Three', 'Four', 'Five'] as const

type FastestRounds = NonNullable<TournamentFormatted['fastestRounds']>

const getDefaultFastestRound = (): FastestRounds['roundOne'] => ({
  player: { name: '', tag: '' },
  time: Number.POSITIVE_INFINITY,
})

const getDefaultFastestRounds = (): FastestRounds =>
  roundNames.reduce((accumulator, roundName) => {
    const key = `round${roundName}` as keyof FastestRounds
    accumulator[key] = getDefaultFastestRound()
    return accumulator
  }, {} as FastestRounds)

export const formatTournamentPlayers = (
  item: TournamentFull[],
): TournamentFormatted => {
  const fastestRounds = getDefaultFastestRounds()
  const members = item[0].teams[0]?.members ?? []

  members.forEach((member) => {
    member.games.forEach((game) => {
      game.rounds.forEach((round) => {
        const { round_time: roundTime, round_number: roundNumber } = round
        const roundKey =
          `round${roundNames[roundNumber - 1]}` as keyof FastestRounds
        if (roundTime > 0 && roundTime < fastestRounds[roundKey].time) {
          fastestRounds[roundKey] = {
            player: member.battleTag,
            time: roundTime,
          }
        }
      })
    })
  })

  const teams = formatTournamentTeams(item[0].teams)
  teams[0]?.members.sort((a, b) => (a.totalTime ?? 0) - (b.totalTime ?? 0))

  return {
    tournament: {
      id: item[0].tournament.id,
      tournamentId: item[0].tournament.tournament_id,
      region: item[0].tournament.region,
      gamemode: item[0].tournament.gamemode,
      gameType: item[0].tournament.game_type,
      datetime: item[0].tournament.datetime,
      adminApproved: item[0].tournament.admin_approved,
      groupId: item[0].tournament.tournament_group_id,
    },
    fastestRounds,
    teams,
  }
}
