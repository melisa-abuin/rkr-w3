import { ApiPlayerStats, Player } from '@/interfaces/player'
import { NextApiRequest, NextApiResponse } from 'next'
import {
  filterByBattleTag,
  getSortConditionByKey,
  fetchData,
  formatRoundsData,
  paginateData,
  sortData,
} from '@/utils'
import { roundNames } from '@/constants'

interface QueryParams {
  battleTag?: string
  difficulty?: 'normal' | 'hard' | 'impossible' | undefined
  page?: number
  pageSize?: number
  sortKey?: keyof Player
  sortOrder?: 'asc' | 'desc'
}

type StatsRequest = NextApiRequest & { query: QueryParams }

/**
 * GET /api/times
 *
 * Returns a paginated, sortable list of all players with their round-time statistics.
 *
 * Query parameters:
 *   - battleTag  (optional): case-insensitive substring filter on player name
 *   - difficulty (optional): filters round-time sort values to a specific difficulty —
 *                            "normal" | "hard" | "impossible"
 *   - page       (optional): 1-based page index. Defaults to 1
 *   - pageSize   (optional): items per page. Defaults to 15
 *   - sortKey    (optional): any key of the Player object (e.g. "roundOne", "roundFive")
 *   - sortOrder  (optional): "asc" | "desc". Defaults to "desc"
 *
 * Response 200:
 * ```json
 * {
 *   "pages": number,
 *   "stats": [
 *     {
 *       "battleTag": { "name": "string", "tag": "string" },
 *       "roundOne":   RoundTimes,
 *       "roundTwo":   RoundTimes,
 *       "roundThree": RoundTimes,
 *       "roundFour":  RoundTimes,
 *       "roundFive":  RoundTimes
 *     }
 *   ]
 * }
 * ```
 * Each `RoundTimes` has the shape:
 * `{ "normal": number, "hard": number, "impossible": number, "nightmare": number, "progressive": number, "solo": number, "best": { "time": number, "difficulty": "string" } }`
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

      const { RoundTimes, PlayerName } = saveData
      const playerStats: Partial<Player> = {}

      playerStats.battleTag = {
        name: PlayerName?.split('#')[0] || '',
        tag: PlayerName || '',
      }

      roundNames.forEach((round) => {
        playerStats[`round${round}`] = formatRoundsData(RoundTimes, round)
      })

      return playerStats
    })

    const {
      page = 1,
      sortKey,
      sortOrder = 'desc',
      pageSize = 15,
      battleTag: queryBattletag,
      difficulty,
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
    console.error('Error fetching times stats data:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
