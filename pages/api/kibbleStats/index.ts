import { ApiPlayerStats, PlayerStats } from '@/interfaces/player'
import { NextApiRequest, NextApiResponse } from 'next'
import { fetchData } from '@/utils/fetchData'
import { getSortConditionByKey } from '@/utils'
import { KibbleLeaderboard } from '@/interfaces/leaderboard'

interface QueryParams {
  page?: number
  pageSize?: number
  sortKey?: keyof KibbleLeaderboard['data'] | 'battleTag'
  sortOrder?: 'asc' | 'desc'
}

type StatsRequest = NextApiRequest & { query: QueryParams }

export default async function handler(req: StatsRequest, res: NextApiResponse) {
  try {
    const data = await fetchData('players')

    const formattedData: PlayerStats[] = data.map((elem: ApiPlayerStats) => {
      const saveData = JSON.parse(elem['Save Data'])

      const { PlayerName, KibbleCurrency, PersonalBests } = saveData
      const playerStats: Partial<PlayerStats> = {}

      playerStats.battleTag = {
        name: PlayerName?.split('#')[0] || '',
        tag: PlayerName || '',
      }

      if (!KibbleCurrency || !PersonalBests) {
        playerStats.kibbles = {
          collectedAllTime: 0,
          jackpots: 0,
          superJackpots: 0,
          collectedSingleGame: 0,
        }
      } else {
        playerStats.kibbles = {
          collectedAllTime: KibbleCurrency?.Collected,
          jackpots: KibbleCurrency?.Jackpots,
          superJackpots: KibbleCurrency.SuperJackpots,
          collectedSingleGame: PersonalBests.KibbleCollected,
        }
      }

      return playerStats
    })

    const {
      page = 1,
      sortKey = 'collectedSingleGame',
      sortOrder = 'desc',
      pageSize = 15,
    } = req.query

    const totalPages = data ? Math.ceil(data?.length / pageSize) : 0

    const initialIndex = (Number(page) - 1) * pageSize

    const sortedData = formattedData.sort((a, b) => {
      const condition =
        sortKey === 'battleTag'
          ? getSortConditionByKey(sortKey, a, b)
          : a.kibbles[sortKey] > b.kibbles[sortKey]

      if (condition === undefined) return 0
      return sortOrder === 'asc' ? (condition ? 1 : -1) : condition ? -1 : 1
    })

    res.status(200).json({
      stats: sortedData.slice(initialIndex, initialIndex + pageSize),
      pages: totalPages,
    })

    res.status(200).json(formattedData)
  } catch (error) {
    console.error('Error fetching scoreboard data:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
