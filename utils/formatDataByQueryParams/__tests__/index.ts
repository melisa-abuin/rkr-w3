import { filterByBattleTag, paginateData, sortData } from '..'

interface MockPlayer {
  battleTag: { name: string }
  score: number
}

describe('formatDataByQueryParams', () => {
  const mockData: MockPlayer[] = [
    { battleTag: { name: 'Alpha' }, score: 30 },
    { battleTag: { name: 'Bravo' }, score: 10 },
    { battleTag: { name: 'charlie' }, score: 20 },
  ]

  describe('filterByBattleTag', () => {
    it('filters data by battleTag name (case-insensitive)', () => {
      expect(
        filterByBattleTag({
          data: mockData,
          battleTag: 'ALP',
        }),
      ).toStrictEqual([{ battleTag: { name: 'Alpha' }, score: 30 }])
    })

    it('returns original data when battleTag query is not provided', () => {
      expect(filterByBattleTag({ data: mockData })).toStrictEqual(mockData)
    })
  })

  describe('sortData', () => {
    it('sorts in desc order by default', () => {
      const sorted = sortData<MockPlayer, 'score'>({
        data: mockData,
        sortKey: 'score',
        getSortCondition: (key, a, b) => a[key] > b[key],
      })

      expect(sorted.map((player) => player.score)).toStrictEqual([30, 20, 10])
    })

    it('sorts in asc order when requested', () => {
      const sorted = sortData<MockPlayer, 'score'>({
        data: mockData,
        sortKey: 'score',
        sortOrder: 'asc',
        getSortCondition: (key, a, b) => a[key] > b[key],
      })

      expect(sorted.map((player) => player.score)).toStrictEqual([10, 20, 30])
    })

    it('returns original data when sortKey is not provided', () => {
      const sorted = sortData<MockPlayer, 'score'>({
        data: mockData,
        getSortCondition: (key, a, b) => a[key] > b[key],
      })

      expect(sorted).toStrictEqual(mockData)
    })
  })

  describe('paginateData', () => {
    it('returns paginated items and pages count', () => {
      const response = paginateData({
        data: mockData,
        page: 2,
        pageSize: 2,
      })

      expect(response).toStrictEqual({
        stats: [{ battleTag: { name: 'charlie' }, score: 20 }],
        pages: 2,
      })
    })
  })
})
