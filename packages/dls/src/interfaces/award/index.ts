export interface Award {
  key: string
  status: number
  category: string
  displayName: string
  description: string
  percentage: number
}

export interface AwardFormatted {
  id: string
  completed: boolean
  description: string
  imagePath: string
  title: string
  percentage: number
}

export interface AwardCategoryFormatted {
  id: string
  awards: AwardFormatted[]
}

export type AwardsDataFormatted = AwardCategoryFormatted[]
