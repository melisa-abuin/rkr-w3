import { Player } from '@/interfaces/player'

const roundKeys = [
  'roundOne',
  'roundTwo',
  'roundThree',
  'roundFour',
  'roundFive',
] as const
type RoundKey = (typeof roundKeys)[number]
type TimeKey = (typeof roundKeys)[number] | 'bestGameTimes'

/**
 * Check if the provided key from player stats is a round
 *
 * @param key player stats key
 * @returns true if it is a round type
 */
export const isRoundKey = (key: keyof Player): key is RoundKey => {
  return roundKeys.includes(key as RoundKey)
}

/**
 * Check if the provided key from player stats is a time key
 *
 * @param key player stats key
 * @returns true if it is a time type
 */
export const isTimeKey = (key: keyof Player): key is TimeKey => {
  return isRoundKey(key) || key === 'bestGameTimes'
}
