import { awardsDescriptions } from '@/constants'
import { AwardsData } from '@/interfaces/award'
import { formatKeyToWord } from '../formatKeyToWord'

export const formatGameAwards = (
  awardsPercentages: Record<string, number> = {},
): AwardsData =>
  Object.entries(awardsDescriptions).map(([key, category]) => ({
    id: key,
    awards: Object.entries(category).map(([awardKey, description]) => ({
      description,
      imagePath: `/awards/${awardKey[0].toLowerCase()}${awardKey.slice(1)}.png`,
      title: formatKeyToWord(awardKey),
      percentage: awardsPercentages[awardKey] || 0,
    })),
  }))

/**
 * Formats raw game awards data into a UI-friendly structure.
 *
 * For each game/category entry, this function:
 * - removes awards with value `-1` (not available)
 * - marks awards as completed when value is `1`
 * - resolves description and title metadata
 * - computes a normalized `id` and image path
 *
 * @param awards Raw awards map keyed by game/category identifier.
 * @returns Array of formatted award groups. Returns an empty array when no data is provided.
 */
export const formatGameAwardsPerPlayer = (
  awards: Record<string, Record<string, number>>,
) =>
  awards
    ? Object.entries(awards).map(([key, value]) => ({
        id: key,
        awards: Object.entries(value)
          .filter(([, awardValue]) => awardValue !== -1)
          .map(([awardKey, awardValue]) => ({
            id: `${awardKey[0].toLowerCase()}${awardKey.slice(1)}`,
            completed: awardValue === 1,
            description:
              awardsDescriptions[key]?.[awardKey] ||
              'Description not available',
            imagePath: `/awards/${awardKey[0].toLowerCase()}${awardKey.slice(1)}.png`,
            title: formatKeyToWord(awardKey),
          })),
      }))
    : []
