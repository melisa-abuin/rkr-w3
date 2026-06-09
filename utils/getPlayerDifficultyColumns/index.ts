import { Difficulty } from '@/interfaces/difficulty'

const baseColumns = [
  { title: 'Fastest Game', key: 'bestGameTimes' },
  { title: 'Games Played', key: 'Games' },
  { title: 'Wins', key: 'Wins' },
] as const

type BaseKey = (typeof baseColumns)[number]['key']
type PrefixedKey<D extends Difficulty> = `${D}${Capitalize<BaseKey>}`

export const getPlayerDifficultyColumns = <D extends Difficulty>(
  difficulty: D,
): Array<{ title: string; key: PrefixedKey<D> }> =>
  baseColumns.map(({ title, key }) => ({
    title,
    key: `${difficulty}${key.charAt(0).toUpperCase()}${key.slice(1)}` as PrefixedKey<D>,
  }))
