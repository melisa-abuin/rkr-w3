import { Difficulty } from '@/interfaces/difficulty'
import { ApiPlayerStats, Player } from '@/interfaces/player'
import {
  calculateCompletedChallenges,
  calculateSaveDeathRatio,
  calculateTotals,
  calculateWinRate,
  fetchData,
  filterByBattleTag,
  getSortConditionByKey,
  paginateData,
  sortData,
} from '@/utils'
import { NextApiRequest, NextApiResponse } from 'next'

interface QueryParams {
  battleTag?: string
  difficulty?: Difficulty | undefined
  page?: number
  pageSize?: number
  sortKey?: keyof Player
  sortOrder?: 'asc' | 'desc'
}

type StatsRequest = NextApiRequest & { query: QueryParams }

/**
 * GET /api/stats
 *
 * Returns a paginated, sortable list of all players with their general statistics.
 *
 * Query parameters:
 *   - battleTag  (optional): case-insensitive substring filter on player name
 *   - difficulty (optional): filters round-based sort values to a specific difficulty —
 *                            "normal" | "hard" | "impossible" | "solo" | "nightmare" | "progressive"
 *   - page       (optional): 1-based page index. Defaults to 1
 *   - pageSize   (optional): items per page. Defaults to 15
 *   - sortKey    (optional): any key of the Player object (e.g. "wins", "saves", "winRate")
 *   - sortOrder  (optional): "asc" | "desc". Defaults to "desc"
 *
 * Response 200:
 * ```json
 * {
 *   "pages": number,
 *   "stats": [
 *     {
 *       "battleTag":           { "name": "string", "tag": "string" },
 *       "saves":               number,
 *       "deaths":              number,
 *       "saveDeathRatio":      number,
 *       "highestWinStreak":    number,
 *       "completedChallenges": { "general": [number, number], "tournament": [number, number] },
 *       "wins":                { "normal": number, "hard": number, "impossible": number, "nightmare": number, "progressive": number, "total": number },
 *       "gamesPlayed":         { "normal": number, "hard": number, "impossible": number, "nightmare": number, "progressive": number, "total": number },
 *       "winRate":             "string"
 *     }
 *   ]
 * }
 * ```
 *
 * Response 500 – `{ "message": "Internal Server Error" }`
 */
export default async function handler(req: StatsRequest, res: NextApiResponse) {
  try {
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=480, stale-while-revalidate=960',
    )
    const data = await fetchData('players')

    const formattedData: Player[] = data.map((elem: ApiPlayerStats) => {
      const saveData = JSON.parse(elem['Save Data'])

      const { GameStats, PlayerName, GameAwardsSorted } = saveData
      const playerStats: Partial<Player> = {}

      playerStats.completedChallenges =
        calculateCompletedChallenges(GameAwardsSorted)

      playerStats.saves = GameStats.Saves
      playerStats.deaths = GameStats.Deaths
      playerStats.highestWinStreak = GameStats.HighestWinStreak

      playerStats.saveStreak = {
        highestScore: GameStats.HighestSaveStreak,
        redLightning: !!GameAwardsSorted.Trails.RedLightning,
        patrioticTendrils: !!GameAwardsSorted.Wings.PatrioticTendrils,
      }

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

      playerStats.winRate = calculateWinRate(
        playerStats.wins.total,
        playerStats.gamesPlayed.total,
      )

      return playerStats
    })

    const {
      page = 1,
      sortKey,
      sortOrder = 'desc',
      difficulty,
      pageSize = 15,
      battleTag: queryBattletag,
    } = req.query

    const filteredData = filterByBattleTag({
      battleTag: queryBattletag,
      data: formattedData,
    })

    const sortedData = sortData({
      data: filteredData,
      sortKey,
      sortOrder,
      getSortCondition: (key, a, b) =>
        getSortConditionByKey(key, a, b, difficulty),
    })

    const response = paginateData({
      data: sortedData,
      page,
      pageSize,
    })

    res.status(200).json(response)
  } catch (error) {
    console.error('Error fetching scoreboard data:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
