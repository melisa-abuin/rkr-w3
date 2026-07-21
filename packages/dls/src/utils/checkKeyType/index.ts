import { Difficulty } from '@/interfaces/difficulty'
import { Player } from '@/interfaces/player'

export const roundKeys = [
  'roundOne',
  'roundTwo',
  'roundThree',
  'roundFour',
  'roundFive',
] as const
type RoundKey = (typeof roundKeys)[number]

/**
 * Check if the provided key from player stats is a plain round key (e.g. 'roundOne')
 *
 * @param key player stats key
 * @returns true if it is a round key
 */
export const isRoundKey = (key: keyof Player): key is RoundKey => {
  return roundKeys.includes(key as RoundKey)
}

/**
 * Check if a key is a time-based key.
 * Handles plain round keys ('roundOne'), suffixed round keys ('roundOneHard'),
 * and 'bestGameTimes'.
 *
 * @param key any string key
 * @returns true if it represents a time value
 */
export const isTimeKey = (key: string): boolean => {
  return roundKeys.some((rk) => rk === key) || key === 'bestGameTimes'
}

export const isTimeKeyWithDiff = (key: string, filter: Difficulty): boolean => {
  const fullKey = `${key}${filter.charAt(0).toUpperCase()}${filter.slice(1)}`
  return roundKeys.some((rk) => fullKey.startsWith(rk))
}
