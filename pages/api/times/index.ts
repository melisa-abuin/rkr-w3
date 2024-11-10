import { PlayerStats } from '@/interfaces/player'
import { NextApiRequest, NextApiResponse } from 'next'
import { mapKeysToSnakeCase } from '@/utils/mapKeysToSnakeCase'
import { formatRoundsData } from '@/utils/formatRoundsData'

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

    // if the data volume increases here we will need to implement a cache/invalidation method
    const formattedData = data.map((elem: PlayerStats) => {
      const newObject: Partial<PlayerStats> = {}

      Object.entries(elem).forEach(([key, value]) => {
        newObject[mapKeysToSnakeCase(key) as keyof PlayerStats] = value
      })

      const rounds = [1, 2, 3, 4, 5] as const

      rounds.forEach((round) => {
        newObject[`r${round}`] = formatRoundsData(newObject, round)
      })

      return newObject
    })

    res
      .status(200)
      .setHeader(
        'Cache-Control',
        'public, s-maxage=86400, stale-while-revalidate=86400',
      )
      .json(formattedData)
  } catch (error) {
    console.error('Error fetching scoreboard data:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
