import { FeaturedApiResponse, FeaturedItem } from '@/interfaces/featured'
import { skinToImagePath } from '../skinToImagePath'

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
    imageSrc: skinToImagePath(awardKey),
    subtitle: `${completionPercentage}% of players`,
    title: awardName,
  }))
