import { ApiAward } from '../award'
import { Player } from '../player'

export interface FeaturedContent {
  challenges: ApiAward[]
  players: Player[]
}
