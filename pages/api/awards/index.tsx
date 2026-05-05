import { NextApiRequest, NextApiResponse } from 'next'
import { awardsDescriptions } from '@/constants'
import { AwardsData } from '@/interfaces/award'
import { formatGameAwards } from '@/utils/formatGameAwards'
import { fetchData } from '@/utils'
import { ApiPlayerStats, AwardsPercentages } from '@/interfaces/player'

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  try {
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=900, stale-while-revalidate=1800',
    )
    const data = await fetchData('players')

    const awardsPercentages = Object.fromEntries(
      Object.values(awardsDescriptions)
        .flatMap((categoryAwards) => Object.keys(categoryAwards))
        .map((awardKey) => [awardKey, 0]),
    ) as AwardsPercentages

    data.forEach((elem: ApiPlayerStats) => {
      const saveData = JSON.parse(elem['Save Data'])
      const { GameAwardsSorted } = saveData

      if (GameAwardsSorted && typeof GameAwardsSorted === 'object') {
        Object.values(GameAwardsSorted).forEach((categoryAwards) => {
          if (!categoryAwards || typeof categoryAwards !== 'object') {
            return
          }

          Object.entries(categoryAwards).forEach(([awardKey, awardValue]) => {
            if (awardValue === 1 && awardsPercentages[awardKey] !== undefined) {
              awardsPercentages[awardKey] += 1
            }
          })
        })
      }
    })

    const totalPlayers = data.length || 1

    Object.keys(awardsPercentages).forEach((awardKey) => {
      awardsPercentages[awardKey] = Number(
        ((awardsPercentages[awardKey] / totalPlayers) * 100).toFixed(2),
      )
    })

    const formattedData: AwardsData = formatGameAwards(awardsPercentages)

    const visibleAwardsData: AwardsData = formattedData
      .map((awardCategory) => ({
        ...awardCategory,
        awards: awardCategory.awards.filter(
          (challenge) => challenge.percentage > 0,
        ),
      }))
      .filter((awardCategory) => awardCategory.awards.length > 0)

    res.status(200).json(visibleAwardsData)
  } catch (error) {
    console.error('Error fetching leaderboard data:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
