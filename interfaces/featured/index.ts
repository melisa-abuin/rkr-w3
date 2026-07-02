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
