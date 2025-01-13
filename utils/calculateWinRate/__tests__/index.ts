import { calculateWinRate } from '..'

describe('calculateWinRate', () => {
  it('Returns 0 if the player has no wins', () => {
    expect(calculateWinRate(0, 87)).toBe('0%')
  })

  it('Returns 0 if the player has no games', () => {
    expect(calculateWinRate(0, 0)).toBe('0%')
  })

  it('Returns the division between games and wins when all data is provided', () => {
    expect(calculateWinRate(2, 3)).toBe('66.7%')
  })
})
