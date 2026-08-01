import { LeagueScoreboardBreakdown } from '@/interfaces/league'
import { getBreakdownEntries } from '..'

const makeBreakdown = (
  overrides: Partial<LeagueScoreboardBreakdown> = {},
): LeagueScoreboardBreakdown => ({
  weightedWins: 10,
  weightedLosses: 5,
  saveRatio: 8,
  nitroScore: 3,
  streakBonus: 2,
  deathlessBonus: 0,
  kibbleBonus: 1,
  gameSpeedBonus: 4,
  roundSpeedBonus: 6,
  totalScore: 100,
  ...overrides,
})

describe('getBreakdownEntries', () => {
  it('excludes totalScore from entries', () => {
    const items = getBreakdownEntries(makeBreakdown())
    const labels = items.map(({ label }) => label)
    expect(labels).not.toContain('Total Score')
  })

  it('returns all other breakdown keys', () => {
    const items = getBreakdownEntries(makeBreakdown())
    expect(items).toHaveLength(9)
  })

  it('sets percentage 100 for the max value entry', () => {
    const items = getBreakdownEntries(makeBreakdown())
    // weightedWins=10 is the highest
    const max = items.find(({ label }) => label === 'weighted Wins')
    expect(max?.percentage).toBe(100)
  })

  it('returns percentage 0 for all entries when all values are zero', () => {
    const breakdown = makeBreakdown({
      weightedWins: 0,
      weightedLosses: 0,
      saveRatio: 0,
      nitroScore: 0,
      streakBonus: 0,
      deathlessBonus: 0,
      kibbleBonus: 0,
      gameSpeedBonus: 0,
      roundSpeedBonus: 0,
    })
    const items = getBreakdownEntries(breakdown)
    expect(items.every(({ percentage }) => percentage === 0)).toBe(true)
  })
})
