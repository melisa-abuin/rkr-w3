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

export type Renderer<T = unknown> = (
  value: T,
  difficultyFilter?: Difficulty,
) => ReactNode

const renderTooltip: Renderer<TotalsPerDifficulty | RoundTimes | number> = (
  value,
  difficultyFilter,
) => {
  if (typeof value === 'number') return <>{value}</>
  if ('best' in value) {
    return (
      <Tooltip best={value.best} data={value} difficulty={difficultyFilter} />
    )
  }
  return (
    <Tooltip data={value} difficulty={difficultyFilter}>
      {value.total}
    </Tooltip>
  )
}

export const renderers: Record<string, Renderer<any>> = {
  saveDeathRatio: (value: number) => <Ratio data={value} />,
  times: (value: number) => <>{formatSecondsAsTime(value)}</>,
  date: (value: string) => <DatePlayed data={value} />,
  teamMembers: (value: string) => <PlayersList data={value} />,
  completedChallenges: (value: ChallengesT) => <Challenges data={value} />,
  difficulty: (value: string) => <DifficultyData data={value} />,
  battleTag: (value: BattleTagI) => <BattleTag data={value} />,
  saveStreak: (value: SaveStreakI) => <SaveStreak data={value} />,
  wins: renderTooltip,
  gamesPlayed: renderTooltip,
}

export const defaultRenderer: Renderer<any> = renderTooltip
