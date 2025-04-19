import { getTimeAgoFromToday } from '..'

describe('getTimeAgoFromToday', () => {
  const now = new Date()

  it('returns "Today" for current date', () => {
    expect(getTimeAgoFromToday(now.toISOString())).toBe('Today')
  })

  it('returns "1 day ago" for yesterday', () => {
    const oneDayAgo = new Date(now)
    oneDayAgo.setDate(now.getDate() - 1)
    expect(getTimeAgoFromToday(oneDayAgo.toISOString())).toBe('1 day ago')
  })

  it('returns "2 days ago" for 2 days ago', () => {
    const twoDaysAgo = new Date(now)
    twoDaysAgo.setDate(now.getDate() - 2)
    expect(getTimeAgoFromToday(twoDaysAgo.toISOString())).toBe('2 days ago')
  })

  it('returns "1 month ago" for more than 30 days ago', () => {
    const thirtyDaysAgo = new Date(now)
    thirtyDaysAgo.setDate(now.getDate() - 31)
    expect(getTimeAgoFromToday(thirtyDaysAgo.toISOString())).toBe('1 month ago')
  })

  it('returns "2 months ago" for more than 60 days ago', () => {
    const sixtyDaysAgo = new Date(now)
    sixtyDaysAgo.setDate(now.getDate() - 61)
    expect(getTimeAgoFromToday(sixtyDaysAgo.toISOString())).toBe('2 months ago')
  })

  it('returns "1 year ago" for 365 days ago', () => {
    const oneYearAgo = new Date(now)
    oneYearAgo.setDate(now.getDate() - 365)
    expect(getTimeAgoFromToday(oneYearAgo.toISOString())).toBe('1 year ago')
  })

  it('returns "2 years ago" for 800 days ago', () => {
    const longAgo = new Date(now)
    longAgo.setDate(now.getDate() - 800)
    expect(getTimeAgoFromToday(longAgo.toISOString())).toBe('2 years ago')
  })

  it('returns empty string for invalid input', () => {
    expect(getTimeAgoFromToday('')).toBe('')
    expect(getTimeAgoFromToday('invalid-date')).toBe('Today')
  })
})
