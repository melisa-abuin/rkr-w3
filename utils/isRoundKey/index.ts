import { PlayerStats } from '@/interfaces/player'

const roundKeys = ['r1', 'r2', 'r3', 'r4', 'r5'] as const
type RoundKey = (typeof roundKeys)[number]

export const isRoundKey = (key: keyof PlayerStats): key is RoundKey => {
  return roundKeys.includes(key as RoundKey)
}
