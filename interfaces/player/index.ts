import { Difficulty } from '../difficulty'

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

export type KittyColors =
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

export interface RoundTimes {
  best: BestTime
  hard: number
  impossible: number
  normal: number
  solo: number
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
  normal: number
  total: number
}

export interface Player {
  awards: Awards[]
  battleTag: BattleTag
  bestGameTimes: RoundTimes
  completedChallenges: Challenges
  deaths: number
  fastestBesties: FastestBesties
  gamesPlayed: TotalsPerDifficulty
  highestWinStreak: number
  kibbles: Kibbles
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
  mostPlayedColor: KittyColors
}

export type Tops = Record<
  string,
  {
    label: string
    description: string
    all?: number
    normal?: number
    hard?: number
    impossible?: number
  }
>
