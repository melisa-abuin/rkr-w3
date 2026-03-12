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
import Paws from '@/components/atoms/paws'
import { Column, Subtitle, Title } from './styled'

export type Renderer<T = unknown> = (
  value: T,
  difficultyFilter?: Difficulty,
) => ReactNode

const renderDifficultyStats: Renderer<TotalsPerDifficulty | number> = (
  value,
  difficultyFilter,
) => {
  if (typeof value === 'object') {
    return (
      <Tooltip
        data={{
          normal: value.normal,
          hard: value.hard,
          impossible: value.impossible,
          nightmare: value.nightmare,
          progressive: value.progressive,
        }}
        difficulty={difficultyFilter}
      >
        {value.total}
      </Tooltip>
    )
  }
  return <>{value}</>
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
  wins: renderDifficultyStats,
  gamesPlayed: renderDifficultyStats,
}

export const defaultRenderer: Renderer<RoundTimes | unknown> = (
  value,
  difficultyFilter,
) => {
  if (!value) return <>0</>
  if (typeof value === 'object' && 'best' in (value as object)) {
    const roundStats = value as RoundTimes
    return (
      <Tooltip
        data={{
          normal: roundStats.normal,
          hard: roundStats.hard,
          impossible: roundStats.impossible,
          nightmare: roundStats.nightmare,
          progressive: roundStats.progressive,
        }}
        difficulty={difficultyFilter}
        isTimeStats
      >
        <Column>
          <Title>{formatSecondsAsTime(roundStats.best.time)}</Title>
          <Subtitle>({roundStats.best.difficulty})</Subtitle>
          <Paws difficulty={roundStats.best.difficulty} />
        </Column>
      </Tooltip>
    )
  }
  return <>{value || 0}</>
}
