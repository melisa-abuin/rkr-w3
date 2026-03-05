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
