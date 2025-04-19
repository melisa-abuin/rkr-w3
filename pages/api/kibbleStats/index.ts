import { ApiPlayerStats, PlayerStats } from '@/interfaces/player'
import { NextApiRequest, NextApiResponse } from 'next'
import { fetchData } from '@/utils/fetchData'
import { findTopPlayersByInsertion } from '@/utils'

interface QueryParams {
  difficulty?: 'normal' | 'hard' | 'impossible' | undefined
}

type StatsRequest = NextApiRequest & { query: QueryParams }

export default async function handler(req: StatsRequest, res: NextApiResponse) {
  try {
    const data = await fetchData('players')

    const formattedData = data.map((elem: ApiPlayerStats) => {
      const saveData = JSON.parse(elem['Save Data'])

      const { PlayerName, KibbleCurrency, PersonalBests } = saveData
      const playerStats: Partial<PlayerStats> = {}

      playerStats.battleTag = {
        name: PlayerName?.split('#')[0] || '',
        tag: PlayerName || '',
      }

      if (!KibbleCurrency || !PersonalBests) {
        playerStats.kibbles = {
          collectedAllTime: 0,
          jackpots: 0,
          superJackpots: 0,
          collectedSingleGame: 0,
        }
      } else {
        playerStats.kibbles = {
          collectedAllTime: KibbleCurrency?.Collected,
          jackpots: KibbleCurrency?.Jackpots,
          superJackpots: KibbleCurrency.SuperJackpots,
          collectedSingleGame: PersonalBests.KibbleCollected,
        }
      }

      return playerStats as PlayerStats
    })

    const stats = findTopPlayersByInsertion(
      formattedData,
      'kibbles',
      undefined,
      20,
    )

    res.status(200).json(stats)
  } catch (error) {
    console.error('Error fetching scoreboard data:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
