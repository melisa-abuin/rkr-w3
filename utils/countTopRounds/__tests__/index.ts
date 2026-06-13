import { countZeros, countTopRounds } from '..'
import { Tops } from '@/interfaces/player'

describe('countZeros', () => {
  it('returns 0 when no difficulty is first place', () => {
    expect(countZeros({ normal: 1, hard: 2, impossible: 3 })).toBe(0)
  })

  it('counts a single zero', () => {
    expect(countZeros({ normal: 0, hard: 1, impossible: 2 })).toBe(1)
  })

  it('counts multiple zeros', () => {
    expect(countZeros({ normal: 0, hard: 0, impossible: 1 })).toBe(2)
  })

  it('counts the optional nightmare field when zero', () => {
    expect(
      countZeros({ normal: 1, hard: 1, impossible: 1, nightmare: 0 }),
    ).toBe(1)
  })

  it('ignores the nightmare field when undefined', () => {
    expect(countZeros({ normal: 0, hard: 0, impossible: 0 })).toBe(3)
  })

  it('counts all four difficulties as zero', () => {
    expect(
      countZeros({ normal: 0, hard: 0, impossible: 0, nightmare: 0 }),
    ).toBe(4)
  })
})

const makeRound = (
  normal: number,
  hard: number,
  impossible: number,
  nightmare = 1,
) => ({
  normal,
  hard,
  impossible,
  nightmare,
})

describe('countTopRounds', () => {
  it('returns 0 when no round has a first-place rank', () => {
    const data = {
      roundOne: makeRound(1, 1, 1),
      roundTwo: makeRound(1, 1, 1),
      roundThree: makeRound(1, 1, 1),
      roundFour: makeRound(1, 1, 1),
      roundFive: makeRound(1, 1, 1),
    } as unknown as Tops

    expect(countTopRounds(data)).toBe(0)
  })

  it('counts first-place ranks across all rounds', () => {
    const data = {
      roundOne: makeRound(0, 1, 1),
      roundTwo: makeRound(0, 0, 1),
      roundThree: makeRound(1, 1, 1),
      roundFour: makeRound(1, 1, 1),
      roundFive: makeRound(1, 1, 0),
    } as unknown as Tops

    expect(countTopRounds(data)).toBe(4)
  })

  it('accumulates correctly when all rounds have first-place ranks', () => {
    const data = {
      roundOne: makeRound(0, 0, 0, 0),
      roundTwo: makeRound(0, 0, 0, 0),
      roundThree: makeRound(0, 0, 0, 0),
      roundFour: makeRound(0, 0, 0, 0),
      roundFive: makeRound(0, 0, 0, 0),
    } as unknown as Tops

    expect(countTopRounds(data)).toBe(20)
  })
})
