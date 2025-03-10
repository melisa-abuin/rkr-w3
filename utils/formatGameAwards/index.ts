import { awardsDescriptions } from '@/constants'
import { formatKeyToWord } from '../formatKeyToWord'

export const formatGameAwards = (awards: Record<string, number>) =>
  awards
    ? Object.entries(awards).map(([key, value]) => ({
        id: key,
        awards: Object.entries(value)
          .filter(([, awardValue]) => awardValue !== -1)
          .map(([awardKey, awardValue]) => ({
            id: `${awardKey[0].toLowerCase()}${awardKey.slice(1)}`,
            completed: awardValue === 1,
            description:
              awardsDescriptions[awardKey] || 'Description not available',
            imagePath: `/awards/${awardKey[0].toLowerCase()}${awardKey.slice(1)}.png`,
            title: formatKeyToWord(awardKey),
          })),
      }))
    : []
