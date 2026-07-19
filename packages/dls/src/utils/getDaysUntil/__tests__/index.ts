import { getDaysUntil } from '..'

vi.useFakeTimers()
vi.setSystemTime(new Date('2026-07-08T00:00:00.000Z'))

describe('getDaysUntil', () => {
  afterAll(() => {
    vi.useRealTimers()
  })

  it('returns the correct number of days until a future date', () => {
    expect(getDaysUntil('2026-07-18T00:00:00.000Z')).toBe(10)
  })

  it('returns 1 for a date less than 24 hours away (partial day counts as full)', () => {
    expect(getDaysUntil('2026-07-08T12:00:00.000Z')).toBe(1)
  })

  it('returns 0 for a date in the past', () => {
    expect(getDaysUntil('2026-07-01T00:00:00.000Z')).toBe(0)
  })

  it('returns 0 for today (same timestamp)', () => {
    expect(getDaysUntil('2026-07-08T00:00:00.000Z')).toBe(0)
  })
})
