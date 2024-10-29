import { mockApiData } from '@/constants'
import { calculateSaveDeathRatio } from '@/utils/calculateSaveDeathRatio'
import { PlayerStats } from '@/interfaces/player'
import { NextApiRequest, NextApiResponse } from 'next'
import { calculateBestTimeByDifficulty } from '@/utils/calculateBestTimeByDifficulty'

type ObjectKey = Record<keyof PlayerStats, string | number | object>

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const apiKey = process.env.API_KEY

  try {
    if (!apiKey) {
      throw new Error()
    }

    /*const response = await fetch(apiKey, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()*/
    const data = mockApiData

    // if the data volume increases here we will need to implement a cache/invalidation method
    const formattedData = data
      .map((elem) => {
        const newObject: PlayerStats = {}

        Object.entries(elem).map(([key, value]) => {
          const newKey = key
            .toLowerCase()
            .replace(/ : | /g, (match) => (match === ': ' ? ' ' : '_'))
          newObject[newKey] = value
        })

        newObject['save_death_ratio'] = calculateSaveDeathRatio(
          newObject.saves,
          newObject.deaths,
        )
        newObject['games_played'] = {
          normal: newObject.normal_games,
          hard: newObject.hard_games,
          impossible: newObject.impossible_games,
          total:
            newObject.normal_games +
            newObject.hard_games +
            newObject.impossible_games,
        }
        newObject['wins'] = {
          normal: newObject.normal_wins,
          hard: newObject.hard_wins,
          impossible: newObject.impossible_wins,
          total:
            newObject.normal_wins +
            newObject.hard_wins +
            newObject.impossible_wins,
        }
        newObject['r1'] = {
          hard: newObject.round_1_time_hard,
          normal: newObject.round_1_time_normal,
          impossible: newObject.round_1_time_impossible,
          best: calculateBestTimeByDifficulty({
            normal: newObject.round_1_time_normal,
            hard: newObject.round_1_time_hard,
            impossible: newObject.round_1_time_impossible,
          }),
        }
        newObject['r2'] = {
          hard: newObject.round_2_time_hard,
          normal: newObject.round_2_time_normal,
          impossible: newObject.round_2_time_impossible,
          best: calculateBestTimeByDifficulty({
            normal: newObject.round_2_time_normal,
            hard: newObject.round_2_time_hard,
            impossible: newObject.round_2_time_impossible,
          }),
        }
        newObject['r3'] = {
          hard: newObject.round_3_time_hard,
          normal: newObject.round_3_time_normal,
          impossible: newObject.round_3_time_impossible,
          best: calculateBestTimeByDifficulty({
            normal: newObject.round_3_time_normal,
            hard: newObject.round_3_time_hard,
            impossible: newObject.round_3_time_impossible,
          }),
        }
        newObject['r4'] = {
          hard: newObject.round_4_time_hard,
          normal: newObject.round_4_time_normal,
          impossible: newObject.round_4_time_impossible,
          best: calculateBestTimeByDifficulty({
            normal: newObject.round_4_time_normal,
            hard: newObject.round_4_time_hard,
            impossible: newObject.round_4_time_impossible,
          }),
        }
        newObject['r5'] = {
          hard: newObject.round_5_time_hard,
          normal: newObject.round_5_time_normal,
          impossible: newObject.round_5_time_impossible,
          best: calculateBestTimeByDifficulty({
            normal: newObject.round_5_time_normal,
            hard: newObject.round_5_time_hard,
            impossible: newObject.round_5_time_impossible,
          }),
        }
        return newObject
      })
      .slice(0, 5)

    // check this header on production mode with use effect call
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
