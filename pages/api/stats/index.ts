import { calculateSaveDeathRatio } from '@/utils/calculateSaveDeathRatio'
import { ApiPlayerStats, PlayerStats } from '@/interfaces/player'
import { NextApiRequest, NextApiResponse } from 'next'
import { calculateTotals } from '@/utils/calculateTotals'
import { mockApiData } from '@/constants'
import {
  calculateCompletedChallenges,
  calculateCompletedChallengesLegacy,
} from '@/utils/calculateCompletedChallenges'
import { removeBlacklistedPlayers } from '@/utils/removeBlacklistedPlayers'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const apiKey = process.env.API_KEY

  try {
    if (!apiKey) {
      throw new Error()
    }

    let data = []

    if (process.env.NODE_ENV === 'development') {
      data = mockApiData
    } else {
      const response = await fetch(apiKey, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      data = await response.json()
      data = removeBlacklistedPlayers(data)
    }

    const formattedData = data.map((elem: ApiPlayerStats) => {
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

      return playerStats as PlayerStats
    })

    if (req.body.battleTag) {
      res
        .status(200)
        .json(
          formattedData.filter(({ battleTag }) =>
            battleTag.name
              .toLowerCase()
              .includes(req.body.battleTag.toLowerCase()),
          ),
        )
    } else {
      res.status(200).json(formattedData)
    }
  } catch (error) {
    console.error('Error fetching scoreboard data:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
