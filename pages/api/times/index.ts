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

export default async function handler(req: StatsRequest, res: NextApiResponse) {
  try {
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
