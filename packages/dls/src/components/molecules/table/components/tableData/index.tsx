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

export const renderRoundTimesTooltip = (
  value: RoundTimes,
  difficultyFilter?: Difficulty,
): ReactNode => {
  const { best, ...rest } = value

  return <Tooltip best={best} data={rest} difficulty={difficultyFilter} />
}

export const renderTotalsPerDifficultyTooltip = (
  value: TotalsPerDifficulty,
  difficultyFilter?: Difficulty,
): ReactNode => (
  <Tooltip data={value} difficulty={difficultyFilter}>
    {value.total}
  </Tooltip>
)

export const renderSaveDeathRatio = (value: number): ReactNode => (
  <Ratio data={value} />
)

export const renderTimes = (value: number): ReactNode => (
  <>{formatSecondsAsTime(value)}</>
)

export const renderDate = (value: string): ReactNode => (
  <DatePlayed data={value} />
)

export const renderTeamMembers = (value: string): ReactNode => (
  <PlayersList data={value} />
)

export const renderCompletedChallenges = (value: ChallengesT): ReactNode => (
  <Challenges data={value} />
)

export const renderDifficulty = (value: string): ReactNode => (
  <DifficultyData data={value} />
)

export const renderBattleTag = (value: BattleTagI): ReactNode => (
  <BattleTag data={value} />
)

export const renderSaveStreak = (value: SaveStreakI): ReactNode => (
  <SaveStreak data={value} />
)
