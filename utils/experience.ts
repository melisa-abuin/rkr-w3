export const EXPERIENCE_STORAGE_KEY = 'kibbleExp'

export const getStoredExp = (): number => {
  if (typeof window === 'undefined') return 0
  const saved = localStorage.getItem(EXPERIENCE_STORAGE_KEY)
  return saved ? parseInt(saved, 10) : 0
}

export const saveExp = (exp: number): void => {
  if (typeof window === 'undefined') return
  localStorage.setItem(EXPERIENCE_STORAGE_KEY, exp.toString())
}

export interface LevelInfo {
  level: number
  percentage: number
}

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
