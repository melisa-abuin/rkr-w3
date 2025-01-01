import {
  DifficultyStats,
  PlayerStats,
  RoundStats,
  BattleTag as BattleTagI,
  Challenges as ChallengesT,
} from '@/interfaces/player'
import BattleTag from './battleTag'
import Tooltip from './tooltip'
import Ratio from './ratio'
import Challenges from './challenges'
import { secondsToSexagesimal } from '@/utils/secondsToSexagesimal'
import { Difficulty } from '@/interfaces/difficulty'

interface Props {
  data:
    | string
    | number
    | RoundStats
    | DifficultyStats
    | BattleTagI
    | ChallengesT
  keyName: keyof PlayerStats
  difficultyFilter?: Difficulty | undefined
}

const isDifficultyStats = (data: unknown): data is DifficultyStats =>
  typeof data === 'object' && data !== null && 'total' in data

const isRoundStats = (data: unknown): data is RoundStats =>
  typeof data === 'object' && data !== null && 'best' in data

const isBattleTag = (data: unknown): data is BattleTagI =>
  typeof data === 'object' && data !== null && 'name' in data && 'tag' in data

const isChallenges = (data: unknown): data is ChallengesT =>
  Array.isArray(data) &&
  data.length === 2 &&
  typeof data[0] === 'number' &&
  typeof data[1] === 'number'

export const TableData = ({ data, keyName, difficultyFilter }: Props) => {
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

    case 'wins':
    case 'gamesPlayed':
      if (isDifficultyStats(data)) {
        return (
          <Tooltip
            normal={data.normal}
            hard={data.hard}
            impossible={data.impossible}
          >
            {difficultyFilter ? data[difficultyFilter] : data.total}
          </Tooltip>
        )
      }
      return typeof data === 'number' ? <>{data}</> : null

    default:
      if (isRoundStats(data)) {
        return (
          <Tooltip
            normal={secondsToSexagesimal(data.normal)}
            hard={secondsToSexagesimal(data.hard)}
            impossible={secondsToSexagesimal(data.impossible)}
          >
            {difficultyFilter ? (
              secondsToSexagesimal(data[difficultyFilter])
            ) : (
              <>
                {secondsToSexagesimal(data.best.time)}
                <br />({data.best.difficulty})
              </>
            )}
          </Tooltip>
        )
      }
      return typeof data === 'number' ? <>{data}</> : null
  }

  return null
}
