import {
  calculateSaveDeathRatio,
  formatRoundsData,
  calculateTotals,
  fetchData,
} from '@/utils'
import { ApiPlayerStats, Player } from '@/interfaces/player'
import { NextApiRequest, NextApiResponse } from 'next'
import { roundNames } from '@/constants'
import { ApiGameStats, GameStats } from '@/interfaces/game'
import { formatPlayerTops } from '@/utils/formatPlayerTops'

interface QueryParams {
  battleTag: string
}

type StatsRequest = NextApiRequest & { query: QueryParams }

/**
 * GET /api/playerTopPositions/:battleTag
 *
 * Returns the top-position rankings for a specific player across all leaderboard
 * categories and round difficulties. Used by the player dashboard to display
 * achievement badges.
 *
 * Route parameters:
 *   - battleTag (required): player's full BattleTag (e.g. "PlayerName#1234").
 *     Must be URL-encoded when passed in the URL.
 *
 * Response 200 – a `Tops` record keyed by stat/round name:
 * ```json
 * {
 *   "<statKey>": {
 *     "label":       "string",
 *     "description": "string",
 *     "all":         number,          // zero-based rank across all difficulties; -1 = not in top 5
 *     "normal":      number,          // zero-based rank for normal difficulty  (round keys only)
 *     "hard":        number,          // zero-based rank for hard difficulty    (round keys only)
 *     "impossible":  number,          // zero-based rank for impossible         (round keys only)
 *     "nightmare":   number,          // zero-based rank for nightmare          (round keys only)
 *     "progressive": number,          // zero-based rank for progressive        (round keys only)
 *     "solo":        number           // zero-based rank for solo               (round keys only)
 *   }
 * }
 * ```
 * Possible `statKey` values: "highestWinStreak", "saves", "gamesPlayed", "wins",
 * "saveDeathRatio", "kibbles", "roundOne", "roundTwo", "roundThree", "roundFour",
 * "roundFive", "fastestGames".
 *
 * Response 500 – `{ "message": "Internal Server Error" }`
 *   Also returned when battleTag is missing.
 */
export default async function handler(req: StatsRequest, res: NextApiResponse) {
  try {
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=900, stale-while-revalidate=1800',
    )
    const { battleTag } = req.query

    if (!battleTag) {
      throw new Error('Please provide a valid battleTag')
    }

    const leaderboard = await fetchData('players')
    const bestGames = await fetchData('gametimes')

    const formattedLeaderboard = leaderboard.map((elem: ApiPlayerStats) => {
      // We need to format ONLY what is sent to the frontend
      const saveData = JSON.parse(elem['Save Data'])

      const {
        GameStats,
        RoundTimes,
        PlayerName,
        KibbleCurrency,
        PersonalBests,
      } = saveData
      const playerStats: Partial<Player> = {}

      playerStats.saves = GameStats.Saves
      playerStats.highestWinStreak = GameStats.HighestWinStreak

      playerStats.battleTag = {
        name: PlayerName?.split('#')[0] || '',
        tag: PlayerName || '',
      }

      playerStats.saveDeathRatio = calculateSaveDeathRatio(
        GameStats.Saves,
        GameStats.Deaths,
      )

      playerStats.gamesPlayed = calculateTotals(
        GameStats.NormalGames,
        GameStats.HardGames,
        GameStats.ImpossibleGames,
        GameStats.NightmareGames,
        GameStats.ProgressiveGames,
      )

      playerStats.wins = calculateTotals(
        GameStats.NormalWins,
        GameStats.HardWins,
        GameStats.ImpossibleWins,
        GameStats.NightmareWins,
        GameStats.ProgressiveWins,
      )

      roundNames.forEach((round) => {
        playerStats[`round${round}`] = formatRoundsData(RoundTimes, round)
      })

      if (!KibbleCurrency || !PersonalBests) {
        playerStats.kibbles = {
          allTime: 0,
          jackpots: 0,
          superJackpots: 0,
          singleGame: 0,
        }
      } else {
        playerStats.kibbles = {
          allTime: KibbleCurrency.Collected,
          jackpots: KibbleCurrency.Jackpots,
          superJackpots: KibbleCurrency.SuperJackpots,
          singleGame: PersonalBests.KibbleCollected,
        }
      }

      return playerStats
    })

    const formattedBestGames: GameStats[] = bestGames.map(
      (elem: ApiGameStats) => {
        const data = JSON.parse(elem.Data)

        const gameStats: Partial<GameStats> = {}
        gameStats.difficulty = elem.Difficulty

        gameStats.times = {
          roundFive: data.RoundFiveTime,
          roundFour: data.RoundFourTime,
          roundOne: data.RoundOneTime,
          roundThree: data.RoundThreeTime,
          roundTwo: data.RoundTwoTime,
          total: data.Time,
        }
        gameStats.teamMembers = data.TeamMembers
        return gameStats
      },
    )

    const tops = formatPlayerTops(
      battleTag,
      formattedLeaderboard,
      formattedBestGames,
    )

    res.status(200).json(tops)
  } catch (error) {
    console.error('Error fetching player data:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
