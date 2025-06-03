import { ApiPlayerStats, Player } from '@/interfaces/player'
import { NextApiRequest, NextApiResponse } from 'next'
import { transformKeysToCamelCase, fetchData } from '@/utils'

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await fetchData('players')

    const formattedData: Player[] = data
      .map((elem: ApiPlayerStats) => {
        const saveData = JSON.parse(elem['Save Data'])

        const { PlayerName, KibbleCurrency, PersonalBests, SelectedData } =
          saveData
        const playerStats: Partial<Player> = {}

        playerStats.battleTag = {
          name: PlayerName?.split('#')[0] || '',
          tag: PlayerName || '',
        }

        playerStats.skins = transformKeysToCamelCase(SelectedData)

        if (!KibbleCurrency || !PersonalBests) {
          playerStats.kibbles = {
            allTime: 0,
            jackpots: 0,
            superJackpots: 0,
            singleGame: 0,
          }
        } else {
          playerStats.kibbles = {
            allTime: KibbleCurrency.Collected,
            jackpots: KibbleCurrency.Jackpots,
            superJackpots: KibbleCurrency.SuperJackpots,
            singleGame: PersonalBests.KibbleCollected,
          }
        }

        return playerStats
      })
      .sort((a: Player, b: Player) => {
        return a.kibbles.singleGame < b.kibbles.singleGame ? 1 : -1
      })
      .slice(0, 20)

    res.status(200).json(formattedData)
  } catch (error) {
    console.error('Error fetching kibble leaderboard data:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
