import { buildSearchQuery } from '..'

describe('buildSearchQuery', () => {
  it('returns an empty string when searchParams is empty', () => {
    expect(buildSearchQuery({})).toBe('')
  })

  it('returns a query string for a single param', () => {
    expect(buildSearchQuery({ page: '2' })).toBe('?page=2')
  })

  it('appends multiple values for array params', () => {
    const result = buildSearchQuery({ tags: ['a', 'b'] })
    expect(result).toBe('?tags=a&tags=b')
  })

  it('skips the reserved filter key', () => {
    expect(buildSearchQuery({ filter: 'stats', page: '1' })).toBe('?page=1')
  })

  it('skips entries with undefined value', () => {
    expect(buildSearchQuery({ page: undefined, sort: 'asc' })).toBe('?sort=asc')
  })

  it('returns an empty string when all params are skipped', () => {
    expect(buildSearchQuery({ filter: 'stats', page: undefined })).toBe('')
  })

  it('handles multiple scalar params', () => {
    const result = buildSearchQuery({ page: '1', sort: 'asc', order: 'desc' })
    expect(result).toBe('?page=1&sort=asc&order=desc')
  })
})
