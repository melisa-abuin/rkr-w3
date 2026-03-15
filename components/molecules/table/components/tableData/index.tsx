import { ReactNode } from 'react'
import { formatSecondsAsTime } from '@/utils'
import { Difficulty } from '@/interfaces/difficulty'
import BattleTag from './components/battleTag'
import Tooltip from './components/tooltip'
import Ratio from './components/ratio'
import Challenges from './components/challenges'
import SaveStreak from './components/saveStreak'
import {
  TotalsPerDifficulty,
  RoundTimes,
  BattleTag as BattleTagI,
  Challenges as ChallengesT,
  SaveStreak as SaveStreakI,
} from '@/interfaces/player'
import PlayersList from './components/playersList'
import DatePlayed from './components/datePlayed'
import DifficultyData from './components/difficulty'

type TooltipData = TotalsPerDifficulty | RoundTimes | number

export type Renderer<T = unknown> = (
  value: T,
  difficultyFilter?: Difficulty,
) => ReactNode

const renderTooltip: Renderer<TooltipData> = (value, difficultyFilter) => {
  if (typeof value === 'number') return <>{value}</>
  if ('best' in value) {
    const { best, ...rest } = value
    return <Tooltip best={best} data={rest} difficulty={difficultyFilter} />
  }
  return (
    <Tooltip data={value} difficulty={difficultyFilter}>
      {value.total}
    </Tooltip>
  )
}

export const renderers: Record<string, Renderer<unknown>> = {
  saveDeathRatio: (value) => <Ratio data={value as number} />,
  times: (value) => <>{formatSecondsAsTime(value as number)}</>,
  date: (value) => <DatePlayed data={value as string} />,
  teamMembers: (value) => <PlayersList data={value as string} />,
  completedChallenges: (value) => <Challenges data={value as ChallengesT} />,
  difficulty: (value) => <DifficultyData data={value as string} />,
  battleTag: (value) => <BattleTag data={value as BattleTagI} />,
  saveStreak: (value) => <SaveStreak data={value as SaveStreakI} />,
  wins: (value, difficultyFilter) =>
    renderTooltip(value as TooltipData, difficultyFilter),
  gamesPlayed: (value, difficultyFilter) =>
    renderTooltip(value as TooltipData, difficultyFilter),
}

export const defaultRenderer: Renderer<unknown> = (value, difficultyFilter) =>
  renderTooltip(value as TooltipData, difficultyFilter)
