export interface FeaturedItem {
  imageSrc: string
  imageFallbackSrc: string
  label: string
  subLabel?: string
}

export interface FeaturedContent {
  players: FeaturedItem[]
  challenges: FeaturedItem[]
}

export interface FeaturedApiPlayer {
  battleTag: string
  selectedSkin: string
  fastestTime: number
}

export interface FeaturedApiChallenge {
  awardName: string
  awardKey: string
  completionPercentage: number
}

export interface FeaturedApiResponse {
  players: FeaturedApiPlayer[]
  challenges: FeaturedApiChallenge[]
}
