const windowMs = 24 * 60 * 60 * 1000
const hits = new Map<string, number[]>()

// In-memory on purpose so no visitor identifier is ever persisted; the limit resets on restart and is per instance
export function consumeRateLimit(key: string, limit: number): boolean {
  const now = Date.now()

  for (const [storedKey, timestamps] of hits) {
    const recent = timestamps.filter((t) => now - t < windowMs)
    if (recent.length) hits.set(storedKey, recent)
    else hits.delete(storedKey)
  }

  const recent = hits.get(key) ?? []
  if (recent.length >= limit) return false

  hits.set(key, [...recent, now])
  return true
}
