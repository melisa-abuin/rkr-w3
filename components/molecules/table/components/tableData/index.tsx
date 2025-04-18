import { secondsToSexagesimal } from '@/utils/secondsToSexagesimal'
import { Difficulty } from '@/interfaces/difficulty'
import BattleTag from './battleTag'
import Tooltip from './tooltip'
import Ratio from './ratio'
import Challenges from './challenges'
import SaveStreak from './saveStreak'

interface Props<T> {
  data?: T
  keyName: keyof T
  difficultyFilter?: Difficulty | undefined
}

type ComponentPropsMap = {
  saveDeathRatio: React.ComponentProps<typeof Ratio>
  completedChallenges: React.ComponentProps<typeof Challenges>
  battleTag: React.ComponentProps<typeof BattleTag>
  saveStreak: React.ComponentProps<typeof SaveStreak>
  wins: React.ComponentProps<typeof Tooltip>
  gamesPlayed: React.ComponentProps<typeof Tooltip>
}

const variants: {
  [K in keyof ComponentPropsMap]: ({
    data,
  }: ComponentPropsMap[K]) => JSX.Element
} = {
  saveDeathRatio: Ratio,
  completedChallenges: Challenges,
  battleTag: BattleTag,
  saveStreak: SaveStreak,
  wins: Tooltip,
  gamesPlayed: Tooltip,
}

const renderVariant = <K extends keyof ComponentPropsMap>(
  key: K,
  data: ComponentPropsMap[K],
): JSX.Element => {
  const Variant = variants[key]

  return <Variant data={data} />
}

const isValidVariantKey = (key: PropertyKey): key is keyof ComponentPropsMap =>
  key in variants

const isValidVariantData = <K extends keyof ComponentPropsMap>(
  _: K,
  data: unknown,
): data is ComponentPropsMap[K] => {
  return data !== undefined && data !== null
}

export default function TableData<T>({
  data,
  keyName,
  difficultyFilter,
}: Props<T>) {
  if (!data?.[keyName]) {
    return null
  }

  const componentData = data[keyName]

  if (!isValidVariantKey(keyName)) return <>{String(data[keyName])}</>

  if (!isValidVariantData(keyName as keyof ComponentPropsMap, componentData)) {
    return <>{String(componentData)}</>
  }
  console.log(data, keyName)

  return renderVariant(keyName as keyof ComponentPropsMap, componentData)

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
