import { PlayerStats } from '@/interfaces/player'
import { NextApiRequest, NextApiResponse } from 'next'

type ObjectKey = Record<string, string | number>

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY

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
      const newObject: ObjectKey = {}

      Object.entries(elem).map(([key, value]) => {
        const newKey = key.toLowerCase().replace(/ : /g, ' ').replace(/ /g, '_')
        newObject[newKey] = value
      })
      return newObject
    })

    res.status(200).json(formattedData)
  } catch (error) {
    console.error('Error fetching scoreboard data:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
