import { ApiAward } from '../award'
import { BattleTag, RoundTimes } from '../player'

export interface FeaturedPlayer {
  battleTag: BattleTag
  roundFive: RoundTimes
  selectedSkin: string | undefined
}

export interface FeaturedContent {
  challenges: ApiAward[]
  players: FeaturedPlayer[]
}
