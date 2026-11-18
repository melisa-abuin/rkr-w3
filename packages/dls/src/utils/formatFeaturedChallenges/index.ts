import { FeaturedApiResponse, FeaturedItem } from '@/interfaces/featured'

const awardKeyToImagePath = (awardKey: string): string =>
  `/awards/${awardKey[0].toLowerCase()}${awardKey.slice(1)}.png`

/**
 * Maps the featured endpoint challenges into items ready to be displayed.
 * @param data - The featured API response.
 * @returns One item per challenge with its award image and completion rate.
 */
export const formatFeaturedChallenges = (
  data: FeaturedApiResponse,
): FeaturedItem[] =>
  data.challenges.map(({ awardName, awardKey, completionPercentage }) => ({
    imageFallbackSrc: '/awards/fallback.png',
    imageSrc: awardKeyToImagePath(awardKey),
    subtitle: `${completionPercentage}% of players`,
    title: awardName,
  }))
