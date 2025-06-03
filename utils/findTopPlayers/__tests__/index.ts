import { getSortConditionByKey, getValueForKey } from '@/utils'
import { findTopPlayersByInsertion } from '..'
import { Difficulty } from '@/interfaces/difficulty'
import { formattedMockData } from '@/constants'
import { Player } from '@/interfaces/player'

jest.mock('@/utils/getSortConditionByKey', () => ({
  getValueForKey: jest.fn(),
  getSortConditionByKey: jest.fn(),
}))

describe('findTopPlayersByInsertion', () => {
  const mockedPlayers: Player[] = [...formattedMockData]
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

    const result = findTopPlayersByInsertion(mockedPlayers, 'wins')

    expect(result).toHaveLength(5)
    expect(result[0].player).toStrictEqual({ name: 'Pablo', tag: 'Pablo#1234' }) // Highest wins
    expect(result[1].player).toStrictEqual({ name: 'Gonza', tag: 'Gonza#1234' }) // Second highest
    expect(result[4].player).toStrictEqual({ name: 'Eve', tag: 'Eve#1239' }) // Fifth highest
  })

  it('should handle empty input array', () => {
    const result = findTopPlayersByInsertion([], 'wins')

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

    const result = findTopPlayersByInsertion(mockedPlayers, 'wins', mockFilter)

    expect(getValueForKey).toHaveBeenCalledWith(
      'wins',
      expect.anything(),
      'normal',
    )
    expect(result).toHaveLength(5)
  })
})
