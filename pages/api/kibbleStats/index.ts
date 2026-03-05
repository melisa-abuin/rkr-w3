import { ApiPlayerStats, Kibbles, Player } from '@/interfaces/player'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSortConditionByKey, fetchData } from '@/utils'

interface QueryParams {
  battleTag?: string
  page?: number
  pageSize?: number
  sortKey?: keyof Kibbles | 'battleTag'
  sortOrder?: 'asc' | 'desc'
}

type StatsRequest = NextApiRequest & { query: QueryParams }

export default async function handler(req: StatsRequest, res: NextApiResponse) {
  try {
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

    let filteredData = formattedData

    if (queryBattletag) {
      filteredData = filteredData.filter(({ battleTag }) =>
        battleTag.name.toLowerCase().includes(queryBattletag.toLowerCase()),
      )
    }

    const totalPages = filteredData
      ? Math.ceil(filteredData?.length / pageSize)
      : 0

    const initialIndex = (Number(page) - 1) * pageSize

    let sortedData = filteredData

    if (sortKey) {
      sortedData = filteredData.sort((a, b) => {
        const condition =
          sortKey === 'battleTag'
            ? getSortConditionByKey(sortKey, a, b)
            : a.kibbles[sortKey] > b.kibbles[sortKey]

        if (condition === undefined) return 0
        return sortOrder === 'asc' ? (condition ? 1 : -1) : condition ? -1 : 1
      })
    }

    res.status(200).json({
      stats: sortedData.slice(initialIndex, initialIndex + pageSize),
      pages: totalPages,
    })
  } catch (error) {
    console.error('Error fetching kibble stats data:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
