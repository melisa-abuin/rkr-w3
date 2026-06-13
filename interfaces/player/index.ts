import { Difficulty } from '../difficulty'
import { GameStats } from '../game'

export interface ApiRounds {
  RoundOneNormal: number
  RoundTwoNormal: number
  RoundThreeNormal: number
  RoundFourNormal: number
  RoundFiveNormal: number
  RoundOneHard: number
  RoundTwoHard: number
  RoundThreeHard: number
  RoundFourHard: number
  RoundFiveHard: number
  RoundOneImpossible: number
  RoundTwoImpossible: number
  RoundThreeImpossible: number
  RoundFourImpossible: number
  RoundFiveImpossible: number
  RoundOneSolo: number
  RoundTwoSolo: number
  RoundThreeSolo: number
  RoundFourSolo: number
  RoundFiveSolo: number
  RoundOneNightmare: number
  RoundTwoNightmare: number
  RoundThreeNightmare: number
  RoundFourNightmare: number
  RoundFiveNightmare: number
  RoundOneProgressive?: number
  RoundTwoProgressive?: number
  RoundThreeProgressive?: number
  // Round 4 and 5 progressive time is always 0, but we want to keep it in the interface for consistency
  RoundFourProgressive?: 0
  RoundFiveProgressive?: 0
}

export interface ApiPlayerStats {
  battletag: string
  'Save Data': string
}

/* Player after formnatting */
export interface Award {
  id: string
  completed: boolean
  description: string
  imagePath: string
  title: string
}

export interface Awards {
  id: string
  awards: Award[]
}

export interface AwardsPercentages {
  [awardKey: string]: number
}

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

export interface Kibbles {
  allTime: number
  singleGame: number
  jackpots: number
  superJackpots: number
}

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

export interface Player {
  awards: Awards[]
  battleTag: BattleTag
  bestGameTimes: GameStats[]
  completedChallenges: Challenges
  deaths: number
  fastestBesties: FastestBesties
  gamesPlayed: TotalsPerDifficulty
  highestWinStreak: number
  kibbleCollected: number
  kibbleJackpots: number
  kibbleSuperJackpots: number
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

type RoundRanks = {
  normal: number
  hard: number
  impossible: number
  nightmare: number
}

type FastestGameRanks = {
  normal: number
  hard: number
  impossible: number
}

export type Tops = {
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
