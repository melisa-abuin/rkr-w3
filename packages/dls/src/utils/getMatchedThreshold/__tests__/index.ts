import { getMatchedThreshold } from '..'

describe('getMatchedThreshold', () => {
  const colorByPercentage: Record<number, string> = {
    5: 'teal',
    10: 'green',
    25: 'yellow',
  }

  it('returns first matching threshold value', () => {
    expect(getMatchedThreshold(1, colorByPercentage)).toBe('teal')
    expect(getMatchedThreshold(6, colorByPercentage)).toBe('green')
    expect(getMatchedThreshold(24, colorByPercentage)).toBe('yellow')
  })

  it('returns exact threshold value', () => {
    expect(getMatchedThreshold(5, colorByPercentage)).toBe('teal')
    expect(getMatchedThreshold(10, colorByPercentage)).toBe('green')
    expect(getMatchedThreshold(25, colorByPercentage)).toBe('yellow')
  })

  it('returns null when value is greater than all thresholds', () => {
    expect(getMatchedThreshold(26, colorByPercentage)).toBeNull()
  })
})
