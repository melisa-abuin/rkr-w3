export interface FeaturedItem {
  imageFallbackSrc: string
  imageSrc: string
  subtitle: string
  title: string
}

export interface FeaturedApiChallenge {
  awardName: string
  awardKey: string
  completionPercentage: number
}

export interface FeaturedApiResponse {
  challenges: FeaturedApiChallenge[]
}
