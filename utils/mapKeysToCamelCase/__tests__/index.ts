import { mapKeysToCamelCase } from '..'

describe('mapKeysToCamelCase', () => {
  it('Returns a key with camel case format', () => {
    expect(mapKeysToCamelCase('Round 5 Time : Solo')).toBe('round5TimeSolo')
  })

  it('Returns the same key if there is nothing to be formatted', () => {
    expect(mapKeysToCamelCase('saves')).toBe('saves')
  })
})
