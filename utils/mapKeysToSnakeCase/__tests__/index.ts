import { mapKeysToSnakeCase } from '..'

describe('mapKeysToSnakeCase', () => {
  it('Returns a key with snake case format', () => {
    expect(mapKeysToSnakeCase('Round 5 Time : Solo')).toBe('round_5_time_solo')
  })

  it('Returns the same key if there is nothing to be formatted', () => {
    expect(mapKeysToSnakeCase('saves')).toBe('saves')
  })
})
