import { Difficulty } from '../difficulty'

export type Challenges = {
  general: [number, number]
  tournament: [number, number]
}

export interface Awards {
  id: string
  awards: Award[]
}

export interface Award {
  id: string
  completed: boolean
  description: string
  imagePath: string
  title: string
}

export interface Skins {
  selectedAura: string
  selectedHat: string
  selectedSkin: string
  selectedTrail: string
  selectedWindwalk: string
  selectedWings: string
}

export interface SaveStreak {
  highestSaveStreak: number
  redLightning: boolean
  patrioticTendrils: boolean
}
export interface Kibbles {
  collectedAllTime: number
  jackpots: number
  superJackpots: number
  collectedSingleGame: number
}

export interface PlayerStats {
  battleTag: BattleTag
  saves: number
  deaths: number
  highestWinStreak: number
  saveStreak: SaveStreak
  completedChallenges: Challenges
  saveDeathRatio: number
  gamesPlayed: DifficultyStats
  winRate: string
  wins: DifficultyStats
  winStreak: number
  roundOne: RoundStats
  roundTwo: RoundStats
  roundThree: RoundStats
  roundFour: RoundStats
  roundFive: RoundStats
  kibbles: Kibbles
}

export type FastestBesties = Record<1 | 2 | 3, string[]>

export interface DetailedPlayerStats extends PlayerStats {
  awards: Awards[]
  skins: Skins
  lastUploaded: string
  bestGameTimes: RoundStats
  fastestBesties: FastestBesties
  mostPlayedColor:
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
}

export interface FromattedApiPlayerStats {
  battleTag: string
  saves: number
  deaths: number
  normalGames: number
  hardGames: number
  impossibleGames: number
  highestSaveStreak: number
  highestWinStreak: number
  normalWins: number
  hardWins: number
  impossibleWins: number
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
  completedChallenges: string
}

export interface ApiPlayerStats {
  battletag: string
  'Save Data': string
}

export interface BattleTag {
  name: string
  tag: string
}
export interface RoundStats {
  best: BestTime
  hard: number
  impossible: number
  normal: number
  solo: number
}

export interface BestTime {
  time: number
  difficulty: Difficulty
}

export interface DifficultyStats {
  hard: number
  normal: number
  impossible: number
  total: number
}

export type PlayersStats = PlayerStats[]
