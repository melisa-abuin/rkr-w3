import { PlayerStats } from '@/interfaces/player'

const roundKeys = [
  'roundOne',
  'roundTwo',
  'roundThree',
  'roundFour',
  'roundFive',
] as const
type RoundKey = (typeof roundKeys)[number]

/**
 * Check if the provided key from player stats is a round
 *
 * @param key player stats key
 * @returns true if it is a round type
 */
export const isRoundKey = (key: keyof PlayerStats): key is RoundKey => {
  return roundKeys.includes(key as RoundKey)
}
