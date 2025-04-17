import {
  DifficultyStats,
  RoundStats,
  BattleTag as BattleTagI,
  Challenges as ChallengesT,
  SaveStreak as SaveStreakI,
} from '@/interfaces/player'
import { secondsToSexagesimal } from '@/utils/secondsToSexagesimal'
import { Difficulty } from '@/interfaces/difficulty'
import BattleTag from './battleTag'
import Tooltip from './tooltip'
import Ratio from './ratio'
import Challenges from './challenges'
import SaveStreak from './saveStreak'

interface Props<T> {
  data?: T[keyof T]
  keyName: keyof T
  difficultyFilter?: Difficulty | undefined
}

const isDifficultyStats = (data: unknown): data is DifficultyStats =>
  typeof data === 'object' && data !== null && 'total' in data

const isRoundStats = (data: unknown): data is RoundStats =>
  typeof data === 'object' && data !== null && 'best' in data

const isBattleTag = (data: unknown): data is BattleTagI =>
  typeof data === 'object' && data !== null && 'name' in data && 'tag' in data

const isSaveStreak = (data: unknown): data is SaveStreakI =>
  typeof data === 'object' &&
  data !== null &&
  'highestSaveStreak' in data &&
  'redLightning' in data &&
  'patrioticTendrils' in data

const isChallenges = (data: unknown): data is ChallengesT =>
  typeof data === 'object' &&
  data !== null &&
  'general' in data &&
  'tournament' in data

export default function TableData<T>({
  data,
  keyName,
  difficultyFilter,
}: Props<T>) {
  switch (keyName) {
    case 'saveDeathRatio':
      if (typeof data === 'number') return <Ratio ratio={data} />
      break

    case 'completedChallenges':
      if (isChallenges(data)) return <Challenges challenges={data} />
      break

    case 'battleTag':
      if (isBattleTag(data)) return <BattleTag battleTag={data} />
      break

    case 'saveStreak':
      if (isSaveStreak(data)) return <SaveStreak saveStreak={data} />
      break

    case 'wins':
    case 'gamesPlayed':
      if (isDifficultyStats(data)) {
        if (difficultyFilter) {
          return <>{data[difficultyFilter]}</>
        }
        return (
          <Tooltip
            normal={data.normal}
            hard={data.hard}
            impossible={data.impossible}
          >
            {data.total}
          </Tooltip>
        )
      }
      return typeof data === 'number' ? <>{data}</> : null

    default:
      if (isRoundStats(data)) {
        if (difficultyFilter) {
          return <>{secondsToSexagesimal(data[difficultyFilter])}</>
        }

        return (
          <Tooltip
            normal={secondsToSexagesimal(data.normal)}
            hard={secondsToSexagesimal(data.hard)}
            impossible={secondsToSexagesimal(data.impossible)}
          >
            {secondsToSexagesimal(data.best.time)}
            <br />({data.best.difficulty})
          </Tooltip>
        )
      }
      return <>{data}</>
  }

  return null
}
