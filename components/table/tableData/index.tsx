import { DifficultyStats, PlayerStats, RoundStats } from '@/interfaces/player'
import BattleTag from './battleTag'
import Tooltip from './tooltip'
import Ratio from './ratio'
import Challenges from './challenges'
import { secondsToSexagesimal } from '@/utils/secondsToSexagesimal'

interface Props {
  data: string | number | RoundStats | DifficultyStats
  keyName: keyof PlayerStats
}

const isDifficultyStats = (data: unknown): data is DifficultyStats =>
  typeof data === 'object' && data !== null && 'total' in data

const isRoundStats = (data: unknown): data is RoundStats =>
  typeof data === 'object' && data !== null && 'best' in data

export const TableData = ({ data, keyName }: Props) => {
  switch (keyName) {
    case 'save_death_ratio':
      if (typeof data === 'number') return <Ratio ratio={data} />
      break

    case 'completed_challenges':
      if (typeof data === 'string') return <Challenges challenges={data} />
      break

    case 'battletag':
      if (typeof data === 'string') return <BattleTag battletag={data} />
      break

    case 'wins':
    case 'games_played':
      if (isDifficultyStats(data)) {
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
      break

    default:
      if (isRoundStats(data)) {
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
      return typeof data === 'number' ? <>{data}</> : null
  }

  return null
}
