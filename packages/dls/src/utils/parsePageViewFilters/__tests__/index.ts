import { parsePageViewFilters } from '..'

const now = new Date('2026-09-30T12:00:00.000Z')

describe('parsePageViewFilters', () => {
  it('returns defaults when no params are provided', () => {
    expect(parsePageViewFilters({}, now)).toEqual({
      month: '2026-09',
      bots: 'all',
      groupPlayers: true,
      page: 1,
    })
  })

  it('parses valid params', () => {
    expect(
      parsePageViewFilters(
        { month: '2026-01', bots: 'humans', groupPlayers: 'false', page: '3' },
        now,
      ),
    ).toEqual({
      month: '2026-01',
      bots: 'humans',
      groupPlayers: false,
      page: 3,
    })
  })

  it('falls back to defaults for invalid values', () => {
    expect(
      parsePageViewFilters(
        { month: '2026-13', bots: 'robots', page: '-2' },
        now,
      ),
    ).toEqual({ month: '2026-09', bots: 'all', groupPlayers: true, page: 1 })
    expect(parsePageViewFilters({ page: '1.5' }, now).page).toBe(1)
    expect(parsePageViewFilters({ page: 'abc' }, now).page).toBe(1)
  })

  it('uses the first value when a param is repeated', () => {
    expect(parsePageViewFilters({ bots: ['bots', 'humans'] }, now).bots).toBe(
      'bots',
    )
  })
})
