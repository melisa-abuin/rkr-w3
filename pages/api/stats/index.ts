import { calculateSaveDeathRatio } from '@/utils/calculateSaveDeathRatio'
import { ApiPlayerStats, PlayerStats } from '@/interfaces/player'
import { NextApiRequest, NextApiResponse } from 'next'
import { calculateTotals } from '@/utils/calculateTotals'
import {
  calculateCompletedChallenges,
  calculateCompletedChallengesLegacy,
} from '@/utils/calculateCompletedChallenges'
import { calculateWinRate } from '@/utils/calculateWinRate'
import { getSortConditionByKey } from '@/utils/getSortConditionByKey'
import { fetchData } from '@/utils/fetchData'

interface QueryParams {
  battleTag: string
  page: number
  pageSize: number
  sortKey: keyof PlayerStats
  sortOrder: 'asc' | 'desc'
}

type StatsRequest = NextApiRequest & { query: QueryParams }

export default async function handler(req: StatsRequest, res: NextApiResponse) {
  try {
    const data = await fetchData('players')

    const formattedData: PlayerStats[] = data.map((elem: ApiPlayerStats) => {
      const saveData = JSON.parse(elem['Save Data'])

      const { GameStats, PlayerName, GameAwards, GameAwardsSorted } = saveData
      const playerStats: Partial<PlayerStats> = {}

      if (GameAwardsSorted) {
        playerStats.completedChallenges =
          calculateCompletedChallenges(GameAwardsSorted)
      } else {
        playerStats.completedChallenges =
          calculateCompletedChallengesLegacy(GameAwards)
      }

      playerStats.saves = GameStats.Saves
      playerStats.deaths = GameStats.Deaths
      playerStats.highestWinStreak = GameStats.HighestWinStreak

      if (GameAwardsSorted) {
        playerStats.saveStreak = {
          highestSaveStreak: GameStats.HighestSaveStreak,
          redLightning: !!GameAwardsSorted.Trails.RedLightning,
          patrioticTendrils: !!GameAwardsSorted.Wings.PatrioticTendrils,
        }
      } else {
        playerStats.saveStreak = {
          highestSaveStreak: GameStats.HighestSaveStreak,
          redLightning: !!GameAwards.RedLightning,
          patrioticTendrils: !!GameAwards.PatrioticTendrils,
        }
      }

      playerStats['battleTag'] = {
        name: PlayerName?.split('#')[0] || '',
        tag: PlayerName || '',
      }

      playerStats['saveDeathRatio'] = calculateSaveDeathRatio(
        GameStats.Saves,
        GameStats.Deaths,
      )

      playerStats['gamesPlayed'] = calculateTotals(
        GameStats.NormalGames,
        GameStats.HardGames,
        GameStats.ImpossibleGames,
      )

      playerStats['wins'] = calculateTotals(
        GameStats.NormalWins,
        GameStats.HardWins,
        GameStats.ImpossibleWins,
      )

      playerStats['winRate'] = calculateWinRate(
        playerStats.wins.total,
        playerStats.gamesPlayed.total,
      )

      return playerStats
    })

    const {
      page = 1,
      sortKey = 'completedChallenges',
      sortOrder = 'desc',
      pageSize = 15,
      battleTag: queryBattletag,
    } = req.query

    if (queryBattletag) {
      res
        .status(200)
        .json(
          formattedData.filter(({ battleTag }) =>
            battleTag.name.toLowerCase().includes(queryBattletag.toLowerCase()),
          ),
        )
    } else {
      const initialIndex = (Number(page) - 1) * pageSize

      const sortedData = formattedData.sort((a, b) => {
        const condition = getSortConditionByKey(sortKey, a, b)
        if (condition === undefined) return 0
        return sortOrder === 'asc' ? (condition ? 1 : -1) : condition ? -1 : 1
      })
      res
        .status(200)
        .json(sortedData.slice(initialIndex, initialIndex + pageSize))
    }
  } catch (error) {
    console.error('Error fetching scoreboard data:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
