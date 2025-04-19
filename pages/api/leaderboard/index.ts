import { ApiPlayerStats, PlayerStats } from '@/interfaces/player'
import { NextApiRequest, NextApiResponse } from 'next'

import { roundNames } from '@/constants'
import {
  calculateSaveDeathRatio,
  calculateTotals,
  fetchData,
  findTopFive,
  formatRoundsData,
} from '@/utils'

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await fetchData('players')

    const formattedData = data
      .map((elem: ApiPlayerStats) => {
        // We need to format ONLY what is sent to the frontend
        const saveData = JSON.parse(elem['Save Data'])

        const { GameStats, RoundTimes, PlayerName } = saveData
        const playerStats: Partial<PlayerStats> = {}

        playerStats.saves = GameStats.Saves
        playerStats.highestWinStreak = GameStats.HighestWinStreak

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

        roundNames.forEach((round) => {
          playerStats[`round${round}`] = formatRoundsData(RoundTimes, round)
        })

        return playerStats
      })
      .sort((a: PlayerStats, b: PlayerStats) =>
        a.gamesPlayed.total < b.gamesPlayed.total ? 1 : -1,
      )

    const stats = {
      stats: [
        {
          category: 'Win Streak',
          data: findTopFive(formattedData, 'highestWinStreak'),
          key: 'highestWinStreak',
        },
        {
          category: 'Saves',
          data: findTopFive(formattedData, 'saves'),
          key: 'saves',
        },
        {
          category: 'Games Played',
          data: findTopFive(formattedData, 'gamesPlayed'),
          key: 'gamesPlayed',
        },
        {
          category: 'Wins',
          data: findTopFive(formattedData, 'wins'),
          key: 'wins',
        },
        {
          category: 'Save/Death Ratio',
          data: findTopFive(formattedData, 'saveDeathRatio'),
          key: 'saveDeathRatio',
        },
      ],
      times: [
        {
          category: 'Round One',
          data: findTopFive(formattedData, 'roundOne'),
          key: 'roundOne',
        },
        {
          category: 'Round Two',
          data: findTopFive(formattedData, 'roundTwo'),
          key: 'roundTwo',
        },
        {
          category: 'Round Three',
          data: findTopFive(formattedData, 'roundThree'),
          key: 'roundThree',
        },
        {
          category: 'Round Four',
          data: findTopFive(formattedData, 'roundFour'),
          key: 'roundFour',
        },
        {
          category: 'Round Five',
          data: findTopFive(formattedData, 'roundFive'),
          key: 'roundFive',
        },
      ],
    }

    res.status(200).json(stats)
  } catch (error) {
    console.error('Error fetching leaderboard data:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
