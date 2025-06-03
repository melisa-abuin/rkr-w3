import { secondsToSexagesimal } from '@/utils'
import { Difficulty } from '@/interfaces/difficulty'
import BattleTag from './battleTag'
import Tooltip from './tooltip'
import Ratio from './ratio'
import Challenges from './challenges'
import SaveStreak from './saveStreak'
import {
  TotalsPerDifficulty,
  RoundTimes,
  BattleTag as BattleTagI,
  Challenges as ChallengesT,
  SaveStreak as SaveStreakI,
} from '@/interfaces/player'
import PlayersList from './playersList'
import DatePlayed from './datePlayed'
import DifficultyData from './difficulty'

interface Props<T> {
  data?: T
  keyName: keyof T
  difficultyFilter?: Difficulty | undefined
}

const isDifficultyStats = (data: unknown): data is TotalsPerDifficulty =>
  typeof data === 'object' && data !== null && 'total' in data
const isRoundStats = (data: unknown): data is RoundTimes =>
  typeof data === 'object' && data !== null && 'best' in data
const isBattleTag = (data: unknown): data is BattleTagI =>
  typeof data === 'object' && data !== null && 'name' in data && 'tag' in data
const isSaveStreak = (data: unknown): data is SaveStreakI =>
  typeof data === 'object' &&
  data !== null &&
  'highestScore' in data &&
  'redLightning' in data &&
  'patrioticTendrils' in data
const isChallenges = (data: unknown): data is ChallengesT =>
  typeof data === 'object' &&
  data !== null &&
  'general' in data &&
  'tournament' in data

// Fix this component
export default function TableData<T>({
  data,
  keyName,
  difficultyFilter,
}: Props<T>) {
  if (!data?.[keyName]) {
    return <>0</>
  }
  const componentData = data[keyName]

  switch (keyName) {
    case 'saveDeathRatio':
      if (typeof componentData === 'number')
        return <Ratio data={componentData} />
      break
    case 'time':
      if (typeof componentData === 'number')
        return <>{secondsToSexagesimal(componentData)}</>
      break
    case 'date':
      if (typeof componentData === 'string')
        return <DatePlayed data={componentData} />
      break
    case 'teamMembers':
      if (typeof componentData === 'string')
        return <PlayersList data={componentData} />
      break
    case 'completedChallenges':
      if (isChallenges(componentData))
        return <Challenges data={componentData} />
      break
    case 'difficulty':
      if (typeof componentData === 'string')
        return <DifficultyData data={componentData} />
      break

    case 'battleTag':
      if (isBattleTag(componentData)) return <BattleTag data={componentData} />
      break

    case 'saveStreak':
      if (isSaveStreak(componentData))
        return <SaveStreak data={componentData} />
      break

    case 'wins':
    case 'gamesPlayed':
      if (isDifficultyStats(componentData)) {
        return (
          <Tooltip
            data={{
              normal: componentData.normal,
              hard: componentData.hard,
              impossible: componentData.impossible,
            }}
            difficulty={difficultyFilter}
          >
            {componentData.total}
          </Tooltip>
        )
      }
      return typeof componentData === 'number' ? <>{componentData}</> : null

    default:
      if (isRoundStats(componentData)) {
        return (
          <Tooltip
            data={{
              normal: componentData.normal,
              hard: componentData.hard,
              impossible: componentData.impossible,
            }}
            difficulty={difficultyFilter}
            isTimeStats
          >
            {secondsToSexagesimal(componentData.best.time)}
            <br />({componentData.best.difficulty})
          </Tooltip>
        )
      }
      return <>{componentData || 0}</>
  }
}
