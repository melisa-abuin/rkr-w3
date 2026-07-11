import {
  renderBattleTag,
  renderCompletedChallenges,
  renderDate,
  renderDifficulty,
  renderRoundTimesTooltip,
  renderSaveDeathRatio,
  renderSaveStreak,
  renderTeamMembers,
  renderTimes,
  renderTotalsPerDifficultyTooltip,
} from '@/components/molecules/table/components/tableData'
import { Difficulty } from '@/interfaces/difficulty'
import { BestGameTimeFormatted } from '@/interfaces/game'
import {
  BattleTag,
  Challenges,
  Kibbles,
  Player,
  SaveStreak,
  TotalsPerDifficulty,
} from '@/interfaces/player'
import { components } from '@/interfaces/api'
import { ReactNode } from 'react'

type Column<T> = {
  title: string
  key: keyof T
  render?: (data: T, difficultyFilter?: Difficulty) => ReactNode
}

export type KibbleRow = Kibbles & {
  battleTag: BattleTag
}

export type StatsRow = components['schemas']['StatsRowDTO']

export const statsColumnsWithRender: Column<StatsRow>[] = [
  {
    title: 'Player',
    key: 'battleTag',
    render: (player) =>
      renderBattleTag(player.battleTag as BattleTag),
  },
  {
    title: 'Completed Challenges',
    key: 'completedChallenges',
    render: (player) =>
      renderCompletedChallenges(player.completedChallenges as Challenges),
  },
  { title: 'Saves', key: 'saves' },
  {
    title: 'S/D Ratio',
    key: 'saveDeathRatio',
    render: (player) => renderSaveDeathRatio(player.saveDeathRatio ?? 0),
  },
  {
    title: 'Games Played',
    key: 'gamesPlayed',
    render: (player, difficultyFilter) =>
      renderTotalsPerDifficultyTooltip(
        player.gamesPlayed as TotalsPerDifficulty,
        difficultyFilter,
      ),
  },
  {
    title: 'Wins',
    key: 'wins',
    render: (player, difficultyFilter) =>
      renderTotalsPerDifficultyTooltip(
        player.wins as TotalsPerDifficulty,
        difficultyFilter,
      ),
  },
  {
    title: 'Highest Save Streak',
    key: 'saveStreak',
    render: (player) => renderSaveStreak(player.saveStreak as SaveStreak),
  },
  { title: 'Highest Win Streak', key: 'highestWinStreak' },
]

export const timeAllDiffColumnsWithRender: Column<Player>[] = [
  {
    title: 'Player',
    key: 'battleTag',
    render: (player) => renderBattleTag(player.battleTag),
  },
  {
    title: 'Best R1 Times',
    key: 'roundOne',
    render: (player, difficultyFilter) =>
      renderRoundTimesTooltip(player.roundOne, difficultyFilter),
  },
  {
    title: 'Best R2 Times',
    key: 'roundTwo',
    render: (player, difficultyFilter) =>
      renderRoundTimesTooltip(player.roundTwo, difficultyFilter),
  },
  {
    title: 'Best R3 Times',
    key: 'roundThree',
    render: (player, difficultyFilter) =>
      renderRoundTimesTooltip(player.roundThree, difficultyFilter),
  },
  {
    title: 'Best R4 Times',
    key: 'roundFour',
    render: (player, difficultyFilter) =>
      renderRoundTimesTooltip(player.roundFour, difficultyFilter),
  },
  {
    title: 'Best R5 Times',
    key: 'roundFive',
    render: (player, difficultyFilter) =>
      renderRoundTimesTooltip(player.roundFive, difficultyFilter),
  },
]

export const kibbleColumnsWithRender: Column<KibbleRow>[] = [
  {
    title: 'Player',
    key: 'battleTag',
    render: (player) => renderBattleTag(player.battleTag),
  },
  { title: 'Single Game', key: 'singleGame' },
  { title: 'All time', key: 'allTime' },
  { title: 'Jackpots', key: 'jackpots' },
  { title: 'Super Jackpots', key: 'superJackpots' },
]

export const bestGameTimesColumnsWithRender: Column<BestGameTimeFormatted>[] = [
  {
    title: 'Time',
    key: 'totalTime',
    render: (game) => renderTimes(game.totalTime),
  },
  {
    title: 'Players',
    key: 'teamMembers',
    render: (game) => renderTeamMembers(game.teamMembers),
  },
  {
    title: 'Difficulty',
    key: 'difficulty',
    render: (game) => renderDifficulty(game.difficulty),
  },
  {
    title: 'Date',
    key: 'date',
    render: (game) => renderDate(game.date),
  },
]

export const playerFinderColumns = [
  { title: 'Saves', key: 'saves' },
  { title: 'Deaths', key: 'deaths' },
  { title: 'S/D Ratio', key: 'saveDeathRatio' },
  { title: 'Win Rate', key: 'winRate' },
  { title: 'Highest Win Streak', key: 'highestWinStreak' },
] as const
