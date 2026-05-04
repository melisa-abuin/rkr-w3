export interface Award {
  description: string
  imagePath: string
  title: string
  percentage: number
}

export interface AwardCategory {
  id: string
  awards: Award[]
}

export type AwardsData = AwardCategory[]
