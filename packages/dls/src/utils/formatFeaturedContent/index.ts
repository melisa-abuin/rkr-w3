import { FeaturedApiResponse, FeaturedContent } from '@/interfaces/featured'
import { formatSecondsAsTime } from '../formatSecondsAsTime'

const skinToImagePath = (skin: string): string =>
  `/awards/${skin[0].toLowerCase()}${skin.slice(1)}.png`

const awardNameToImagePath = (name: string): string => {
  const camelCase = name
    .split(' ')
    .map((word, i) =>
      i === 0
        ? word[0].toLowerCase() + word.slice(1)
        : word[0].toUpperCase() + word.slice(1),
    )
    .join('')

  return `/awards/${camelCase}.png`
}

export const formatFeaturedContent = (
  data: FeaturedApiResponse,
): FeaturedContent => ({
  players: data.players.map(({ battleTag, selectedSkin, fastestTime }) => ({
    imageSrc: skinToImagePath(selectedSkin),
    imageFallbackSrc: '/awards/fallback.png',
    label: battleTag,
    subLabel: formatSecondsAsTime(fastestTime),
  })),
  challenges: data.challenges.map(
    ({ awardName, awardKey, completionPercentage }) => ({
      imageSrc: awardNameToImagePath(awardKey),
      imageFallbackSrc: '/awards/fallback.png',
      label: awardName,
      subLabel: `${completionPercentage}%`,
    }),
  ),
})
