import { BattleTag } from '../player'

interface FastestRound {
  player: BattleTag
  time: number
}

export interface Tournament {
  tournament: {
    id: number
    tournament_id: string
    region: string
    gamemode: string
    game_type: string
    datetime: string
    admin_approved: number
    tournament_group_id: number | null
  }
  players: TournamentPlayer[]
}

export type Tournaments = Array<Tournament>

export interface TournamentPlayer {
  battleTag: string
  totalTime: number
  games: TournamentGame[]
}

export interface TournamentGame {
  id: number
  tournament_id: number
  battleTag: string
  game_number: number
  game_uid: string
  team: string
  team_members: string
  total_deaths: number
  total_progress: number
  total_saves: number
  totalTime: number
  rounds: TournamentRound[]
}

export interface TournamentRound {
  id: number
  game_id: number
  round_number: number
  deaths: number
  level: number
  progress: number
  round_time: number
  saves: number
}

export interface TournamentFormatted {
  tournament: {
    id: number
    region: string
    gamemode: string
    gameType: string
    datetime: string
    groupId: number | null
  }
  fastestRounds: {
    roundOne: FastestRound
    roundTwo: FastestRound
    roundThree: FastestRound
    roundFour: FastestRound
    roundFive: FastestRound
  }
  players: TournamentPlayerFormatted[]
}

export interface TournamentPlayerFormatted extends Omit<
  TournamentPlayer,
  'games' | 'battleTag'
> {
  battleTag: BattleTag | string
  games: TournamentGame[]
}
