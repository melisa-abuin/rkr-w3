import { ApiPlayerStats, PlayerStats } from '@/interfaces/player'
import {
  calculateCompletedChallenges,
  calculateCompletedChallengesLegacy,
  calculateSaveDeathRatio,
  calculateTotals,
  calculateWinRate,
  fetchData,
  getSortConditionByKey,
} from '@/utils'
import { NextApiRequest, NextApiResponse } from 'next'

interface QueryParams {
  battleTag?: string
  difficulty?: 'normal' | 'hard' | 'impossible' | undefined
  page?: number
  pageSize?: number
  sortKey?: keyof PlayerStats
  sortOrder?: 'asc' | 'desc'
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
      )

      playerStats.wins = calculateTotals(
        GameStats.NormalWins,
        GameStats.HardWins,
        GameStats.ImpossibleWins,
      )

      playerStats.winRate = calculateWinRate(
        playerStats.wins.total,
        playerStats.gamesPlayed.total,
      )

      return playerStats
    })

    const {
      page = 1,
      sortKey = 'completedChallenges',
      sortOrder = 'desc',
      difficulty,
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
      const totalPages = data ? Math.ceil(data?.length / pageSize) : 0

      const initialIndex = (Number(page) - 1) * pageSize

      const sortedData = formattedData.sort((a, b) => {
        const condition = getSortConditionByKey(sortKey, a, b, difficulty)
        if (condition === undefined) return 0
        return sortOrder === 'asc' ? (condition ? 1 : -1) : condition ? -1 : 1
      })
      res.status(200).json({
        stats: sortedData.slice(initialIndex, initialIndex + pageSize),
        pages: totalPages,
      })
    }
  } catch (error) {
    console.error('Error fetching scoreboard data:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
