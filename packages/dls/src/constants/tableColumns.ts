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
import { LeagueScoreboardBreakdown } from '@/interfaces/league'
import { BattleTag, Kibbles, Player } from '@/interfaces/player'
import { ReactNode } from 'react'

type LeagueScoreboardBreakdownRow = LeagueScoreboardBreakdown & {
  battleTag: BattleTag
}

type Column<T> = {
  title: string
  key: keyof T
  render?: (data: T, difficultyFilter?: Difficulty) => ReactNode
}

export type KibbleRow = Kibbles & {
  battleTag: BattleTag
}

export const statsColumnsWithRender: Column<Player>[] = [
  {
    title: 'Player',
    key: 'battleTag',
    render: (player) => renderBattleTag(player.battleTag),
  },
  {
    title: 'Completed Challenges',
    key: 'completedChallenges',
    render: (player) => renderCompletedChallenges(player.completedChallenges),
  },
  { title: 'Saves', key: 'saves' },
  {
    title: 'S/D Ratio',
    key: 'saveDeathRatio',
    render: (player) => renderSaveDeathRatio(player.saveDeathRatio),
  },
  {
    title: 'Games Played',
    key: 'gamesPlayed',
    render: (player, difficultyFilter) =>
      renderTotalsPerDifficultyTooltip(player.gamesPlayed, difficultyFilter),
  },
  {
    title: 'Wins',
    key: 'wins',
    render: (player, difficultyFilter) =>
      renderTotalsPerDifficultyTooltip(player.wins, difficultyFilter),
  },
  {
    title: 'Highest Save Streak',
    key: 'saveStreak',
    render: (player) => renderSaveStreak(player.saveStreak),
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

export const leagueScoreboardBreakdownColumns: Column<LeagueScoreboardBreakdownRow>[] =
  [
    {
      title: 'Player',
      key: 'battleTag',
      render: (row) => renderBattleTag(row.battleTag),
    },
    { title: 'Wins', key: 'weightedWins' },
    { title: 'Losses', key: 'weightedLosses' },
    { title: 'Save Ratio', key: 'saveRatio' },
    { title: 'Nitro Score', key: 'nitroScore' },
    { title: 'Streak Bonus', key: 'streakBonus' },
    { title: 'Deathless Bonus', key: 'deathlessBonus' },
    { title: 'Kibble Bonus', key: 'kibbleBonus' },
    { title: 'Game Speed Bonus', key: 'gameSpeedBonus' },
    { title: 'Round Speed Bonus', key: 'roundSpeedBonus' },
    { title: 'Total Score', key: 'totalScore' },
  ]
