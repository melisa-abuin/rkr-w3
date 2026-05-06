import { ApiPlayerStats, Kibbles, Player } from '@/interfaces/player'
import { NextApiRequest, NextApiResponse } from 'next'
import {
  filterByBattleTag,
  getSortConditionByKey,
  fetchData,
  paginateData,
  sortData,
} from '@/utils'

interface QueryParams {
  battleTag?: string
  page?: number
  pageSize?: number
  sortKey?: keyof Kibbles | 'battleTag'
  sortOrder?: 'asc' | 'desc'
}

type StatsRequest = NextApiRequest & { query: QueryParams }

/**
 * GET /api/kibbleStats
 *
 * Returns a paginated, sortable list of all players with their kibble statistics.
 *
 * Query parameters:
 *   - battleTag  (optional): case-insensitive substring filter on player name
 *   - page       (optional): 1-based page index. Defaults to 1
 *   - pageSize   (optional): items per page. Defaults to 15
 *   - sortKey    (optional): field to sort by — "allTime" | "singleGame" | "jackpots" | "superJackpots" | "battleTag"
 *   - sortOrder  (optional): "asc" | "desc". Defaults to "desc"
 *
 * Response 200:
 * ```json
 * {
 *   "pages": number,
 *   "stats": [
 *     {
 *       "battleTag": {
 *         "name": "string",  // display name (without #tag)
 *         "tag":  "string"   // full BattleTag including discriminator
 *       },
 *       "kibbles": {
 *         "allTime":       number,
 *         "singleGame":    number,
 *         "jackpots":      number,
 *         "superJackpots": number
 *       }
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

      const { PlayerName, KibbleCurrency, PersonalBests } = saveData
      const playerStats: Partial<Player> = {}

      playerStats.battleTag = {
        name: PlayerName?.split('#')[0] || '',
        tag: PlayerName || '',
      }

      if (!KibbleCurrency || !PersonalBests) {
        playerStats.kibbles = {
          allTime: 0,
          jackpots: 0,
          superJackpots: 0,
          singleGame: 0,
        }
      } else {
        playerStats.kibbles = {
          allTime: KibbleCurrency?.Collected,
          jackpots: KibbleCurrency?.Jackpots,
          superJackpots: KibbleCurrency.SuperJackpots,
          singleGame: PersonalBests.KibbleCollected,
        }
      }

      return playerStats
    })

    const {
      page = 1,
      sortKey,
      sortOrder = 'desc',
      pageSize = 15,
      battleTag: queryBattletag,
    } = req.query

    const filteredData = filterByBattleTag({
      battleTag: queryBattletag,
      data: formattedData,
    })

    const sortedData = sortData<Partial<Player>, keyof Kibbles | 'battleTag'>({
      data: filteredData,
      sortKey,
      sortOrder,
      getSortCondition: (key, a, b) => {
        if (key === 'battleTag') {
          return getSortConditionByKey(key, a, b)
        }

        const kibbleKey = key as keyof Kibbles
        const firstValue = a.kibbles?.[kibbleKey] ?? 0
        const secondValue = b.kibbles?.[kibbleKey] ?? 0

        return firstValue > secondValue
      },
    })

    const response = paginateData({
      data: sortedData,
      page,
      pageSize,
    })

    res.status(200).json(response)
  } catch (error) {
    console.error('Error fetching kibble stats data:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
