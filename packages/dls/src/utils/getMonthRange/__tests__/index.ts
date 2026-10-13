import { getMonthRange } from '..'

describe('getMonthRange', () => {
  it('returns the first instant of the month and of the next month in UTC', () => {
    const { from, to } = getMonthRange('2026-09')
    expect(from.toISOString()).toBe('2026-09-01T00:00:00.000Z')
    expect(to.toISOString()).toBe('2026-10-01T00:00:00.000Z')
  })

  it('rolls over to the next year for December', () => {
    const { from, to } = getMonthRange('2026-12')
    expect(from.toISOString()).toBe('2026-12-01T00:00:00.000Z')
    expect(to.toISOString()).toBe('2027-01-01T00:00:00.000Z')
  })
})
