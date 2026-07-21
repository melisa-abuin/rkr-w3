import { Tops } from '@/interfaces/player'

interface DifficultyRanks {
  normal: number
  hard: number
  impossible: number
  nightmare?: number
}

/**
 * Counts how many difficulty ranks are equal to zero (i.e. first place) in a given entry.
 *
 * @param entry - Difficulty rank object with optional nightmare field.
 * @returns Number of difficulties where the player holds first place.
 */
export const countZeros = (entry: DifficultyRanks): number => {
  let count = 0
  if (entry.normal === 0) count++
  if (entry.hard === 0) count++
  if (entry.impossible === 0) count++
  if (entry.nightmare === 0) count++
  return count
}

/**
 * Counts the total number of first-place round times across all five rounds.
 *
 * @param data - Tops data containing rank entries for each round.
 * @returns Total count of first-place positions across all rounds and difficulties.
 */
export const countTopRounds = (data: Tops): number => {
  const rounds = [
    data.roundOne,
    data.roundTwo,
    data.roundThree,
    data.roundFour,
    data.roundFive,
  ]
  return rounds.reduce((acc, round) => acc + countZeros(round), 0)
}
