import { calculateSaveDeathRatio } from '@/utils/calculateSaveDeathRatio'
import {
  ApiPlayerStats,
  FromattedApiPlayerStats,
  PlayerStats,
} from '@/interfaces/player'
import { NextApiRequest, NextApiResponse } from 'next'
import { mapKeysToCamelCase } from '@/utils/mapKeysToCamelCase'
import { formatRoundsData } from '@/utils/formatRoundsData'
import { calculateTotals } from '@/utils/calculateTotals'
import { getNumericCompleteChallenges } from '@/utils/getNumericCompleteChallenges'
import { findTopFive } from '@/utils/findTopFive'
import { mockApiData } from '@/constants'

const keysToMap: (keyof PlayerStats)[] = [
  'saves',
  'deaths',
  'completedChallenges',
  'highestSaveStreak',
  'highestWinStreak',
]

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

    const data = await response.json()

    const formattedData = data.map((elem: ApiPlayerStats) => {
      const saveData = JSON.parse(elem['Save Data'])

      const { GameStats, RoundTimes, PlayerName, GameAwards } = saveData
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

      const roundNames = ['One', 'Two', 'Three', 'Four', 'Five'] as const

      roundNames.forEach((round) => {
        playerStats[`round${round}`] = formatRoundsData(RoundTimes, round)
      })

      return playerStats
    })

    const stats = {
      scoreboard: [
        ...formattedData
          .sort((a: PlayerStats, b: PlayerStats) => {
            return (
              getNumericCompleteChallenges(b.completedChallenges)[0] -
              getNumericCompleteChallenges(a.completedChallenges)[0]
            )
          })
          .slice(0, 5),
      ],
      leaderboard: {
        stats: [
          {
            category: 'Highest Win Streak',
            data: findTopFive(formattedData, 'highestWinStreak'),
          },
          {
            category: 'Most Saves',
            data: findTopFive(formattedData, 'saves'),
          },
          {
            category: 'Most Games Played',
            data: findTopFive(formattedData, 'gamesPlayed'),
          },
          {
            category: 'Most Wins',
            data: findTopFive(formattedData, 'wins'),
          },
          {
            category: 'Save/Death Ratio',
            data: findTopFive(formattedData, 'saveDeathRatio'),
          },
        ],
        times: [
          {
            category: 'Best R1 Times',
            data: findTopFive(formattedData, 'roundOne'),
          },
          {
            category: 'Best R2 Times',
            data: findTopFive(formattedData, 'roundTwo'),
          },
          {
            category: 'Best R3 Times',
            data: findTopFive(formattedData, 'roundThree'),
          },
          {
            category: 'Best R4 Times',
            data: findTopFive(formattedData, 'roundFour'),
          },
          {
            category: 'Best R5 Times',
            data: findTopFive(formattedData, 'roundFive'),
          },
        ],
      },
    }

    res.status(200).json(stats)
  } catch (error) {
    console.error('Error fetching scoreboard data:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
