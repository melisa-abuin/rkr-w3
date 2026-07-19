export const EXPERIENCE_STORAGE_KEY = 'kibbleExp'

/**
 * Retrieves the stored experience points from `localStorage`.
 *
 * If called in a non-browser environment (e.g., server-side rendering),
 * it returns 0.
 *
 * @returns The stored experience points as a number. Defaults to 0 if none are stored.
 */
export const getStoredExp = (): number => {
  if (typeof window === 'undefined') return 0
  const saved = localStorage.getItem(EXPERIENCE_STORAGE_KEY)
  return saved ? parseInt(saved, 10) : 0
}

/**
 * Saves the given experience points to `localStorage`.
 *
 * If called in a non-browser environment (e.g., server-side rendering),
 * the function exits without doing anything.
 *
 * @param exp - The experience points to be saved.
 */
export const saveExp = (exp: number): void => {
  if (typeof window === 'undefined') return
  localStorage.setItem(EXPERIENCE_STORAGE_KEY, exp.toString())
}

/**
 * Represents the player's level information based on total experience points.
 *
 * @property level - The player's current level.
 * @property percentage - The percentage of progress toward the next level (0–99).
 */
export interface LevelInfo {
  level: number
  percentage: number
}

/**
 * Calculates the player's level and their progress percentage toward the next level
 * based on the total accumulated experience points.
 *
 * Each level requires `100 * level` experience points (non-linear growth).
 *
 * @param totalExp - The total accumulated experience points.
 * @returns An object containing the current level and progress percentage toward the next level.
 */
export const getLevelInfo = (totalExp: number): LevelInfo => {
  const baseXp = 100
  let level = 1
  let xpForNext = baseXp * level
  let xpConsumed = 0

  while (totalExp >= xpConsumed + xpForNext) {
    xpConsumed += xpForNext
    level++
    xpForNext = baseXp * level
  }

  const xpIntoLevel = totalExp - xpConsumed
  const percentage = Math.floor((xpIntoLevel / xpForNext) * 100)

  return { level, percentage }
}
