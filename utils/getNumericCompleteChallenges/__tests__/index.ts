import { getNumericCompleteChallenges } from '..'

describe('getNumericCompleteChallenges', () => {
  it('Returns an array of numbers when a string of challenges is provided', () => {
    expect(getNumericCompleteChallenges('56/56')).toStrictEqual([56, 56])
  })
  it('Returns an array of 0 when a string of challenges is not provided', () => {
    expect(getNumericCompleteChallenges('')).toStrictEqual([0, 0])
  })
})
