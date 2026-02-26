import { BattleTag } from '../player'

export interface ApiTournament {
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
  players: ApiTournamentPlayer[]
}

export interface ApiTournaments extends Array<ApiTournament> {}

export interface ApiTournamentPlayer {
  battletag: string
  games: ApiTournamentGame[]
}

export interface ApiTournamentGame {
  id: number
  tournament_id: number
  battletag: string
  game_number: number
  game_uid: string
  team: string
  team_members: string
  total_deaths: number
  total_progress: number
  total_saves: number
  total_time: number
  rounds: ApiTournamentRound[]
}

export interface ApiTournamentRound {
  id: number
  game_id: number
  round_number: number
  deaths: number
  level: number
  progress: number
  round_time: number
  saves: number
}

export interface Tournament extends Omit<ApiTournament, 'players'> {
  players: TournamentPlayer[]
}

export interface Tournaments extends Array<Tournament> {}

export interface TournamentPlayer extends Omit<ApiTournamentPlayer, 'games'> {
  battleTag: BattleTag
  totalTime: number
  games: TournamentGame[]
}

export interface TournamentGame extends ApiTournamentGame {
  totalTime: number
}
