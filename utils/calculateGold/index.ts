export const GOLD_STORAGE_KEY = 'kibbleGold'

/**
 * Retrieves the stored amount of gold from `localStorage`.
 *
 * If called in a non-browser environment (e.g., server-side rendering),
 * it returns 0.
 *
 * @returns The stored gold amount as a number. Defaults to 0 if none is stored.
 */
export const getStoredGold = (): number => {
  if (typeof window === 'undefined') return 0
  const saved = localStorage.getItem(GOLD_STORAGE_KEY)
  return saved ? parseInt(saved, 10) : 0
}

/**
 * Saves the given amount of gold to `localStorage`.
 *
 * If called in a non-browser environment (e.g., server-side rendering),
 * the function exits without doing anything.
 *
 * @param gold - The gold amount to be saved.
 */
export const saveGold = (gold: number): void => {
  if (typeof window === 'undefined') return
  localStorage.setItem(GOLD_STORAGE_KEY, gold.toString())
}
