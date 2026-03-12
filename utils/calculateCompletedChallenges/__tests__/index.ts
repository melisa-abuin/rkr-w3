import { calculateCompletedChallenges } from '..'
import { Challenges } from '@/interfaces/player'

describe('calculateCompletedChallenges', () => {
  it('should return correct values when all categories are filled', () => {
    const mockData = {
      Auras: {
        ButterflyAura: 1,
        FreezeAura: 0,
        ManaAura: 1,
      },
      Hats: {
        Bandana: 1,
        ChefHat: 1,
      },
      Tournament: {
        TurquoiseNitro: 1,
        VioletWings: 0,
      },
    }

    const expected: Challenges = {
      general: [4, 5],
      tournament: [1, 2],
    }

    expect(calculateCompletedChallenges(mockData)).toEqual(expected)
  })

  it('should return [0, 0] when there are no rewards', () => {
    const mockData = {}

    const expected: Challenges = {
      general: [0, 0],
      tournament: [0, 0],
    }

    expect(calculateCompletedChallenges(mockData)).toEqual(expected)
  })

  it('should correctly handle when all rewards are 0', () => {
    const mockData = {
      Auras: {
        ButterflyAura: 0,
        FreezeAura: 0,
      },
      Tournament: {
        TurquoiseNitro: 0,
      },
    }

    const expected: Challenges = {
      general: [0, 2],
      tournament: [0, 1],
    }

    expect(calculateCompletedChallenges(mockData)).toEqual(expected)
  })

  it('should correctly handle when all rewards are 1', () => {
    const mockData = {
      Auras: {
        ButterflyAura: 1,
        FreezeAura: 1,
      },
      Hats: {
        Bandana: 1,
      },
      Tournament: {
        TurquoiseNitro: 1,
        VioletWings: 1,
      },
    }

    const expected: Challenges = {
      general: [3, 3],
      tournament: [2, 2],
    }

    expect(calculateCompletedChallenges(mockData)).toEqual(expected)
  })

  it('should correctly exclude Tournament rewards from general count', () => {
    const mockData = {
      Tournament: {
        TurquoiseNitro: 1,
        VioletWings: 1,
      },
    }

    const expected: Challenges = {
      general: [0, 0],
      tournament: [2, 2],
    }

    expect(calculateCompletedChallenges(mockData)).toEqual(expected)
  })
})
