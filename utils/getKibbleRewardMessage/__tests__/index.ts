import { getKibbleRewardMessage } from '..'

describe('getKibbleRewardMessage', () => {
  it('returns a string as a reward', () => {
    const result = getKibbleRewardMessage()
    expect(typeof result).toBe('string')
  })
})
