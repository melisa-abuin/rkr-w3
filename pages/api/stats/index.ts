import { calculateSaveDeathRatio } from '@/utils/calculateSaveDeathRatio'
import { ApiPlayerStats, PlayerStats } from '@/interfaces/player'
import { NextApiRequest, NextApiResponse } from 'next'
import { calculateTotals } from '@/utils/calculateTotals'
import { mockApiData } from '@/constants'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const apiKey = process.env.API_KEY

  try {
    if (!apiKey) {
      throw new Error()
    }

    const response = await fetch(apiKey, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data =
      process.env.NODE_ENV === 'development'
        ? mockApiData
        : await response.json()

    const formattedData = data.map((elem: ApiPlayerStats) => {
      const saveData = JSON.parse(elem['Save Data'])

      const { GameStats, PlayerName, GameAwards } = saveData
      const playerStats: Partial<PlayerStats> = {}

      const awardValues = Object.values(GameAwards)

      // TODO: remove redundant convertion to string of completed challenges data
      playerStats.completedChallenges = `${awardValues.filter((award) => award).length}/${awardValues.length}`

      playerStats.saves = GameStats.Saves
      playerStats.highestWinStreak = GameStats.HighestWinStreak
      playerStats.highestSaveStreak = GameStats.HighestSaveStreak

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
      return playerStats
    })

    res.status(200).json(formattedData)
  } catch (error) {
    console.error('Error fetching scoreboard data:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
