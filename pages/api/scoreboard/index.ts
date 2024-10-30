//import { mockApiData } from '@/constants'
import { calculateSaveDeathRatio } from '@/utils/calculateSaveDeathRatio'
import { PlayerStats } from '@/interfaces/player'
import { NextApiRequest, NextApiResponse } from 'next'
import { calculateBestTimeByDifficulty } from '@/utils/calculateBestTimeByDifficulty'

//type ObjectKey = Record<keyof PlayerStats, string | number | object>

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
    //const data = mockApiData

    // if the data volume increases here we will need to implement a cache/invalidation method
    const formattedData = data
      .map((elem: PlayerStats) => {
        const newObject: Partial<PlayerStats> = {}

        Object.entries(elem).map(([key, value]) => {
          const newKey = key
            .toLowerCase()
            .replace(/ : | /g, (match) =>
              match === ': ' ? ' ' : '_',
            ) as keyof PlayerStats

          newObject[newKey] = value
        })

        // TODO: fix me
        newObject['save_death_ratio'] = calculateSaveDeathRatio(
          newObject.saves || 0,
          newObject.deaths || 0,
        )
        newObject['games_played'] = {
          normal: newObject.normal_games || 0,
          hard: newObject.hard_games || 0,
          impossible: newObject.impossible_games || 0,
          total:
            (newObject.normal_games || 0) +
            (newObject.hard_games || 0) +
            (newObject.impossible_games || 0),
        }
        newObject['wins'] = {
          normal: newObject.normal_wins || 0,
          hard: newObject.hard_wins || 0,
          impossible: newObject.impossible_wins || 0,
          total:
            (newObject.normal_wins || 0) +
            (newObject.hard_wins || 0) +
            (newObject.impossible_wins || 0),
        }
        newObject['r1'] = {
          hard: newObject.round_1_time_hard || 0,
          normal: newObject.round_1_time_normal || 0,
          impossible: newObject.round_1_time_impossible || 0,
          best: calculateBestTimeByDifficulty({
            normal: newObject.round_1_time_normal || 0,
            hard: newObject.round_1_time_hard || 0,
            impossible: newObject.round_1_time_impossible || 0,
          }),
        }
        newObject['r2'] = {
          hard: newObject.round_2_time_hard || 0,
          normal: newObject.round_2_time_normal || 0,
          impossible: newObject.round_2_time_impossible || 0,
          best: calculateBestTimeByDifficulty({
            normal: newObject.round_2_time_normal || 0,
            hard: newObject.round_2_time_hard || 0,
            impossible: newObject.round_2_time_impossible || 0,
          }),
        }
        newObject['r3'] = {
          hard: newObject.round_3_time_hard || 0,
          normal: newObject.round_3_time_normal || 0,
          impossible: newObject.round_3_time_impossible || 0,
          best: calculateBestTimeByDifficulty({
            normal: newObject.round_3_time_normal || 0,
            hard: newObject.round_3_time_hard || 0,
            impossible: newObject.round_3_time_impossible || 0,
          }),
        }
        newObject['r4'] = {
          hard: newObject.round_4_time_hard || 0,
          normal: newObject.round_4_time_normal || 0,
          impossible: newObject.round_4_time_impossible || 0,
          best: calculateBestTimeByDifficulty({
            normal: newObject.round_4_time_normal || 0,
            hard: newObject.round_4_time_hard || 0,
            impossible: newObject.round_4_time_impossible || 0,
          }),
        }
        newObject['r5'] = {
          hard: newObject.round_5_time_hard || 0,
          normal: newObject.round_5_time_normal || 0,
          impossible: newObject.round_5_time_impossible || 0,
          best: calculateBestTimeByDifficulty({
            normal: newObject.round_5_time_normal || 0,
            hard: newObject.round_5_time_hard || 0,
            impossible: newObject.round_5_time_impossible || 0,
          }),
        }
        return newObject
      })
      .slice(0, 5)

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
