export const GOLD_STORAGE_KEY = 'kibbleGold'

export const getStoredGold = (): number => {
  if (typeof window === 'undefined') return 0
  const saved = localStorage.getItem(GOLD_STORAGE_KEY)
  return saved ? parseInt(saved, 10) : 0
}

export const saveGold = (gold: number): void => {
  if (typeof window === 'undefined') return
  localStorage.setItem(GOLD_STORAGE_KEY, gold.toString())
}
