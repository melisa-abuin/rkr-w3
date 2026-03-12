import { calculateSaveDeathRatio } from '..'

describe('calculateSaveDeathRatio', () => {
  it('Returns 0 if the player has no saves', () => {
    expect(calculateSaveDeathRatio(0, 87)).toBe(0)
  })

  it('Returns the saves value if the player has no deaths', () => {
    expect(calculateSaveDeathRatio(100, 0)).toBe(100)
  })

  it('Returns the division between deaths and saves when all data is provided', () => {
    expect(calculateSaveDeathRatio(9, 3)).toBe(3)
  })
})
