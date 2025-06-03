import { calculateTotals } from '..'

describe('calculateTotals', () => {
  it('Returns a new object with normal, hard, impossible and a total amount calculated', () => {
    expect(calculateTotals(10, 10, 10)).toStrictEqual({
      normal: 10,
      hard: 10,
      impossible: 10,
      total: 30,
    })
  })
})
