import { playerDifficultyColumns } from '@/constants'
import { Difficulty } from '@/interfaces/difficulty'

type ColumnKey = (typeof playerDifficultyColumns)[number]['key']
type NonBestGameKey = Exclude<ColumnKey, 'bestGameTimes'>
type PrefixedKey<D extends Difficulty> =
  | 'bestGameTimes'
  | `${D}${Capitalize<NonBestGameKey>}`

export const getPlayerDifficultyColumns = <D extends Difficulty>(
  difficulty: D,
): Array<{ title: string; key: PrefixedKey<D> }> =>
  playerDifficultyColumns.map(({ title, key }) => ({
    title,
    key: (key === 'bestGameTimes'
      ? key
      : `${difficulty}${key.charAt(0).toUpperCase()}${key.slice(1)}`) as PrefixedKey<D>,
  }))
