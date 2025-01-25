import { calculateSaveDeathRatio } from '@/utils/calculateSaveDeathRatio'
import { DetailedPlayerStats } from '@/interfaces/player'
import { NextApiRequest, NextApiResponse } from 'next'
import { formatRoundsData } from '@/utils/formatRoundsData'
import { calculateTotals } from '@/utils/calculateTotals'
import { mockApiData } from '@/constants'
import { formatGameAwards } from '@/utils/formatGameAwards'
import { transformKeysToCamelCase } from '@/utils/transformKeysToCamelCase'

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
      const response = await fetch(
        `${apiKey}players?battletag=${req.body.battleTag}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      data = await response.json()
    }

    const playerData = data[0]

    const saveData = JSON.parse(playerData['Save Data'])
    const playerStats: Partial<DetailedPlayerStats> = {}
    const { GameStats, RoundTimes, PlayerName, GameAwards, SelectedData } =
      saveData

    playerStats.saves = GameStats.Saves
    playerStats.highestWinStreak = GameStats.HighestWinStreak
    playerStats.highestSaveStreak = GameStats.HighestSaveStreak
    playerStats.awards = formatGameAwards(GameAwards)
    playerStats.skins = transformKeysToCamelCase(SelectedData)

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

    const roundNames = ['One', 'Two', 'Three', 'Four', 'Five'] as const

    roundNames.forEach((round) => {
      playerStats[`round${round}`] = formatRoundsData(RoundTimes, round)
    })

    res.status(200).json(playerStats)
  } catch (error) {
    console.error('Error fetching scoreboard data:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}