import {
  getSortConditionByKey,
  getValueForKey,
} from '@/utils/getSortConditionByKey'
import { findTopFive } from '..'
import { Difficulty } from '@/interfaces/difficulty'
import { formattedMockData } from '@/constants'
import { PlayerStats } from '@/interfaces/player'

jest.mock('@/utils/getSortConditionByKey', () => ({
  getValueForKey: jest.fn(),
  getSortConditionByKey: jest.fn(),
}))

describe('findTopFive', () => {
  const mockedPlayers: PlayerStats[] = [...formattedMockData]
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return the top five players based on the key', () => {
    jest
      .mocked(getValueForKey as jest.Mock)
      .mockImplementation((key, elem) => elem[key])
    jest
      .mocked(getSortConditionByKey as jest.Mock)
      .mockImplementation(
        (key, elem, compareElem) => elem[key] > compareElem[key],
      )

    const result = findTopFive(mockedPlayers, 'wins')

    expect(result).toHaveLength(5)
    expect(result[0].player).toBe('Pablo') // Highest wins
    expect(result[1].player).toBe('Gonza') // Second highest
    expect(result[4].player).toBe('Eve') // Fifth highest
  })

  it('should handle empty input array', () => {
    const result = findTopFive([], 'wins')

    expect(result).toEqual([])
  })

  it('should respect the filter condition', () => {
    const mockFilter: Difficulty | undefined = 'normal'

    jest
      .mocked(getValueForKey as jest.Mock)
      .mockImplementation((key, elem, filter) =>
        filter === 'normal' ? elem[key] : 0,
      )
    jest
      .mocked(getSortConditionByKey as jest.Mock)
      .mockImplementation(
        (key, elem, compareElem) => elem[key] > compareElem[key],
      )

    const result = findTopFive(mockedPlayers, 'wins', mockFilter)

    expect(getValueForKey).toHaveBeenCalledWith(
      'wins',
      expect.anything(),
      'normal',
    )
    expect(result).toHaveLength(5)
  })
})
