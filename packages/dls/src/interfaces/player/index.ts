import { Award } from '../award'
import { Difficulty } from '../difficulty'
import { GameStatsFormatted } from '../game'

export interface BestTime {
  time: number
  difficulty: Difficulty
}

export interface BattleTag {
  name: string
  tag: string
}

export type Challenges = {
  general: [number, number]
  tournament: [number, number]
}

export type PlayerColor =
  | 'red'
  | 'blue'
  | 'teal'
  | 'purple'
  | 'yellow'
  | 'orange'
  | 'green'
  | 'pink'
  | 'gray'
  | 'lightblue'
  | 'darkgreen'
  | 'brown'
  | 'maroon'
  | 'navy'
  | 'turquoise'
  | 'violet'
  | 'wheat'
  | 'peach'
  | 'mint'
  | 'lavender'
  | 'coal'
  | 'snow'
  | 'emerald'
  | 'peanut'
  | null

export type FastestBesties = Record<1 | 2 | 3, string[]>

export interface FastestBestiesData {
  once: string[]
  twice: string[]
  threeOrMore: string[]
}

export interface RoundTimes {
  best: BestTime
  hard: number
  impossible: number
  nightmare: number
  normal: number
  solo: number
  progressive: number
}

export interface SaveStreak {
  highestScore: number
  redLightning: boolean
  patrioticTendrils: boolean
}

export interface Skins {
  selectedAura: string
  selectedHat: string
  selectedSkin: string
  selectedTrail: string
  selectedWindwalk: string
  selectedWings: string
}

export interface TotalsPerDifficulty {
  hard: number
  impossible: number
  nightmare: number
  normal: number
  total: number
  progressive: number
}

export interface Kibbles {
  allTime: number
  singleGame: number
  jackpots: number
  superJackpots: number
}

export interface Player {
  id: string
  awards: Award[]
  battleTag: BattleTag
  bestGameTimes: GameStatsFormatted[]
  completedChallenges: Challenges
  deaths: number
  fastestBesties: FastestBesties
  gamesPlayed: TotalsPerDifficulty
  highestWinStreak: number
  kibbleCollected: number
  kibbleJackpots: number
  kibbleSuperJackpots: number
  personalBestKibbleCollected: number
  lastUploaded: string
  roundFive: RoundTimes
  roundFour: RoundTimes
  roundOne: RoundTimes
  roundThree: RoundTimes
  roundTwo: RoundTimes
  saveDeathRatio: number
  saves: number
  savesSingleGame: number
  saveStreak: SaveStreak
  skins: Skins
  winRate: string
  wins: TotalsPerDifficulty
  winStreak: number
  mostPlayedColor: PlayerColor
}

export interface PlayerSummary extends Player {
  selectedSkin: string
}

interface RoundRanks {
  normal: number
  hard: number
  impossible: number
  nightmare: number
}

interface FastestGameRanks {
  normal: number
  hard: number
  impossible: number
}

export interface Tops {
  saves: number
  wins: number
  highestWinStreak: number
  gamesPlayed: number
  saveDeathRatio: number
  kibbles: number
  roundOne: RoundRanks
  roundTwo: RoundRanks
  roundThree: RoundRanks
  roundFour: RoundRanks
  roundFive: RoundRanks
  fastestGames: FastestGameRanks
}
