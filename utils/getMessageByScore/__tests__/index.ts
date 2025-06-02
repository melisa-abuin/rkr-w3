import { getMessageByScore } from '..'

describe('getMessageByScore', () => {
  it('returns null for scores below the lowest threshold', () => {
    expect(getMessageByScore(0)).toBeNull()
    expect(getMessageByScore(2)).toBeNull()
  })

  it('returns correct message for exact thresholds', () => {
    expect(getMessageByScore(3)).toBe('Keep it up!')
    expect(getMessageByScore(6)).toBe('Looking sharp!')
    expect(getMessageByScore(10)).toBe('Crushing it!')
    expect(getMessageByScore(15)).toBe('On fire!')
    expect(getMessageByScore(20)).toBe('Unstoppable!')
  })

  it('returns latest message below current score', () => {
    expect(getMessageByScore(4)).toBe('Keep it up!')
    expect(getMessageByScore(7)).toBe('Looking sharp!')
    expect(getMessageByScore(14)).toBe('Crushing it!')
    expect(getMessageByScore(18)).toBe('On fire!')
    expect(getMessageByScore(30)).toBe('Unstoppable!')
  })
})
