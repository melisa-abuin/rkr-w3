import { ApiPlayerStats, DetailedPlayerStats } from '@/interfaces/player'
import { NextApiRequest, NextApiResponse } from 'next'
import { fetchData } from '@/utils/fetchData'
import { transformKeysToCamelCase } from '@/utils'

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await fetchData('players')

    const formattedData: DetailedPlayerStats[] = data
      .map((elem: ApiPlayerStats) => {
        const saveData = JSON.parse(elem['Save Data'])

        const { PlayerName, KibbleCurrency, PersonalBests, SelectedData } =
          saveData
        const playerStats: Partial<DetailedPlayerStats> = {}

        playerStats.battleTag = {
          name: PlayerName?.split('#')[0] || '',
          tag: PlayerName || '',
        }

        playerStats.skins = transformKeysToCamelCase(SelectedData)

        if (!KibbleCurrency || !PersonalBests) {
          playerStats.kibbles = {
            collectedAllTime: 0,
            jackpots: 0,
            superJackpots: 0,
            collectedSingleGame: 0,
          }
        } else {
          playerStats.kibbles = {
            collectedAllTime: KibbleCurrency.Collected,
            jackpots: KibbleCurrency.Jackpots,
            superJackpots: KibbleCurrency.SuperJackpots,
            collectedSingleGame: PersonalBests.KibbleCollected,
          }
        }

        return playerStats
      })
      .sort((a: DetailedPlayerStats, b: DetailedPlayerStats) => {
        return a.kibbles.collectedSingleGame < b.kibbles.collectedSingleGame
          ? 1
          : -1
      })
      .slice(0, 20)

    res.status(200).json(formattedData)
  } catch (error) {
    console.error('Error fetching kibble leaderboard data:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
