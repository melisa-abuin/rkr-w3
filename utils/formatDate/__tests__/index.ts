import { formatDateToLocale } from '..'

describe('formatDateToLocale', () => {
  it('should return an empty string if date is falsy', () => {
    expect(formatDateToLocale('')).toBe('')
  })

  it('should return a formatted date string for a valid ISO date', () => {
    const result = formatDateToLocale('2023-12-25')

    const expected = new Date('2023-12-25').toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    expect(result).toBe(expected)
  })

  it('should handle a full ISO datetime string', () => {
    const result = formatDateToLocale('2023-12-25T15:30:00Z')
    const expected = new Date('2023-12-25T15:30:00Z').toLocaleDateString(
      undefined,
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      },
    )
    expect(result).toBe(expected)
  })

  it('should return "Invalid Date" if date string is invalid', () => {
    const result = formatDateToLocale('not-a-date')
    expect(result).toBe('Invalid Date')
  })
})
