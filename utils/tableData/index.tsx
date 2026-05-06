import { ReactNode } from 'react'
import { Difficulty } from '@/interfaces/difficulty'
import {
  TotalsPerDifficulty,
  RoundTimes,
  BattleTag as BattleTagI,
  Challenges as ChallengesT,
  SaveStreak as SaveStreakI,
} from '@/interfaces/player'
import { formatSecondsAsTime } from '../formatSecondsAsTime'
import BattleTag from '@/components/molecules/table/components/tableData/components/battleTag'
import Tooltip from '@/components/molecules/table/components/tableData/components/tooltip'
import Ratio from '@/components/molecules/table/components/tableData/components/ratio'
import Challenges from '@/components/molecules/table/components/tableData/components/challenges'
import SaveStreak from '@/components/molecules/table/components/tableData/components/saveStreak'
import PlayersList from '@/components/molecules/table/components/tableData/components/playersList'
import DatePlayed from '@/components/molecules/table/components/tableData/components/datePlayed'
import DifficultyData from '@/components/molecules/table/components/tableData/components/difficulty'

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