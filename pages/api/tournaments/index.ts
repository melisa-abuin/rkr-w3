import { NextApiRequest, NextApiResponse } from 'next'
import { fetchData } from '@/utils'

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await fetchData('tournaments/full')
    res.status(200).json(data)
  } catch (error) {
    console.error('Error fetching tournaments data:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
