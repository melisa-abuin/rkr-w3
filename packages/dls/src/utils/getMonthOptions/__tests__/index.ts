import { getMonthOptions } from '..'

describe('getMonthOptions', () => {
  const now = new Date('2026-02-15T10:00:00.000Z')

  it('starts from the current month and goes backwards', () => {
    const options = getMonthOptions(now, 3)
    expect(options).toEqual([
      { value: '2026-02', label: 'February 2026' },
      { value: '2026-01', label: 'January 2026' },
      { value: '2025-12', label: 'December 2025' },
    ])
  })

  it('returns 12 months by default', () => {
    expect(getMonthOptions(now)).toHaveLength(12)
  })
})
