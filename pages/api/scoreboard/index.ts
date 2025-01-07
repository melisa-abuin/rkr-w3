import { calculateSaveDeathRatio } from '@/utils/calculateSaveDeathRatio'
import { ApiPlayerStats, PlayerStats } from '@/interfaces/player'
import { NextApiRequest, NextApiResponse } from 'next'
import { formatRoundsData } from '@/utils/formatRoundsData'
import { calculateTotals } from '@/utils/calculateTotals'
import { findTopFive } from '@/utils/findTopFive'
import { mockApiData } from '@/constants'

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
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

      const { GameStats, RoundTimes, PlayerName, GameAwards } = saveData
      const playerStats: Partial<PlayerStats> = {}

      const awardValues = Object.values(GameAwards)

      playerStats.completedChallenges = [
        awardValues.filter((award) => award).length,
        awardValues.length,
      ]

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
            return b.completedChallenges[0] - a.completedChallenges[0]
          })
          .slice(0, 5),
      ],
      leaderboard: {
        stats: [
          // wait for a fix
          // {
          //   category: 'Win Streak',
          //   data: findTopFive(formattedData, 'highestWinStreak'),
          // },
          {
            category: 'Saves',
            data: findTopFive(formattedData, 'saves'),
          },
          {
            category: 'Games Played',
            data: findTopFive(formattedData, 'gamesPlayed'),
          },
          {
            category: 'Wins',
            data: findTopFive(formattedData, 'wins'),
          },
          {
            category: 'Save/Death Ratio',
            data: findTopFive(formattedData, 'saveDeathRatio'),
          },
        ],
        times: [
          {
            category: 'Round One',
            data: findTopFive(formattedData, 'roundOne'),
          },
          {
            category: 'Round Two',
            data: findTopFive(formattedData, 'roundTwo'),
          },
          {
            category: 'Round Three',
            data: findTopFive(formattedData, 'roundThree'),
          },
          {
            category: 'Round Four',
            data: findTopFive(formattedData, 'roundFour'),
          },
          {
            category: 'Round Five',
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
