import { TournamentFormatted, Tournaments } from '@/interfaces/tournament'

export const roundNames = ['One', 'Two', 'Three', 'Four', 'Five'] as const

type FastestRounds = TournamentFormatted['fastestRounds']

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

/**
 * Normalizes tournament players for UI/API consumption.
 *
 * - Computes `fastestRounds` across all players and games
 * - Splits `battleTag` string into `battleTag.name` and `battleTag.tag`
 * - Sorts players by lowest total time (ascending)
 */
export const formatTournamentPlayers = (
  item: Tournaments[number],
): TournamentFormatted => {
  const fastestRounds = getDefaultFastestRounds()
  const players = Array.isArray(item?.players) ? item.players : []
  const playersWithTotalTime = players.map((player) => {
    player?.games?.forEach((game) => {
      game.rounds.forEach((round) => {
        const roundTime = round.round_time
        const roundNumber = round.round_number
        const roundKey =
          `round${roundNames[roundNumber - 1]}` as keyof typeof fastestRounds
        if (roundTime < fastestRounds[roundKey]?.time && roundTime > 0) {
          fastestRounds[roundKey] = {
            player: {
              name: player.battleTag?.split('#')[0] || '',
              tag: player.battleTag || '',
            },
            time: roundTime,
          }
        }
      })
    })

    return {
      ...player,
      battleTag: {
        name: player.battleTag?.split('#')[0] || '',
        tag: player.battleTag || '',
      },
    }
  })

  return {
    ...item,
    tournament: {
      ...item.tournament,
      gameType: item.tournament.game_type,
      groupId: item.tournament.tournament_group_id,
    },
    fastestRounds,
    players: playersWithTotalTime.sort(
      (first, second) => first.totalTime - second.totalTime,
    ),
  }
}
