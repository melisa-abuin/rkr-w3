import { Difficulty } from '@/interfaces/difficulty'
import { ApiPlayerStats, Player } from '@/interfaces/player'
import {
  calculateCompletedChallenges,
  calculateCompletedChallengesLegacy,
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

export default async function handler(req: StatsRequest, res: NextApiResponse) {
  try {
    const data = await fetchData('players')

    const formattedData: Player[] = data.map((elem: ApiPlayerStats) => {
      const saveData = JSON.parse(elem['Save Data'])

      const { GameStats, PlayerName, GameAwards, GameAwardsSorted } = saveData
      const playerStats: Partial<Player> = {}

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
          highestScore: GameStats.HighestSaveStreak,
          redLightning: !!GameAwardsSorted.Trails.RedLightning,
          patrioticTendrils: !!GameAwardsSorted.Wings.PatrioticTendrils,
        }
      } else {
        playerStats.saveStreak = {
          highestScore: GameStats.HighestSaveStreak,
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
      if (playerStats.battleTag.name === 'Cait') {
        console.log('saveData', playerStats)
      }
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
