import { isHalloweenSeason } from '..'

describe('isHalloweenSeason', () => {
  it('returns true for the first and last day of October', () => {
    expect(isHalloweenSeason(new Date(2026, 9, 1))).toBe(true)
    expect(isHalloweenSeason(new Date(2026, 9, 31))).toBe(true)
  })

  it('returns false for September and November', () => {
    expect(isHalloweenSeason(new Date(2026, 8, 30))).toBe(false)
    expect(isHalloweenSeason(new Date(2026, 10, 1))).toBe(false)
  })

  it('returns true in October of any year', () => {
    expect(isHalloweenSeason(new Date(2030, 9, 15))).toBe(true)
  })

  it('uses the current date by default', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 9, 10))
    expect(isHalloweenSeason()).toBe(true)
    vi.setSystemTime(new Date(2026, 5, 10))
    expect(isHalloweenSeason()).toBe(false)
    vi.useRealTimers()
  })
})
