import { formatKeyToWord } from '..'

describe('formatKeyToWord', () => {
  it('should format camelCase strings with spaces', () => {
    expect(formatKeyToWord('camelCaseString')).toBe('camel Case String')
  })

  it('should format PascalCase strings with spaces', () => {
    expect(formatKeyToWord('PascalCaseString')).toBe('Pascal Case String')
  })

  it('should return an empty string for undefined input', () => {
    expect(formatKeyToWord(undefined)).toBe('')
  })

  it('should return an empty string for null input', () => {
    expect(formatKeyToWord(null as unknown as string)).toBe('')
  })

  it('should return an empty string for an empty string input', () => {
    expect(formatKeyToWord('')).toBe('')
  })

  it('should return the same string if there are no capital letters', () => {
    expect(formatKeyToWord('lowercase')).toBe('lowercase')
  })

  it('should handle single-word strings correctly', () => {
    expect(formatKeyToWord('Word')).toBe('Word')
  })
})
