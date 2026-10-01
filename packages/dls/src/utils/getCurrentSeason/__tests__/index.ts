import { LeagueSeason } from '@/interfaces/league'
import { getActiveSeason, getCurrentSeason, getPreviousSeason } from '..'

const seasons: LeagueSeason[] = [
  {
    description: 'Finished season',
    endDate: '2026-08-10T00:00:00.000Z',
    id: 1,
    leagueId: 'One',
    startDate: '2026-08-01T00:00:00.000Z',
  },
  {
    description: 'Active season',
    endDate: '2026-08-30T00:00:00.000Z',
    id: 2,
    leagueId: 'Two',
    startDate: '2026-08-11T00:00:00.000Z',
  },
]

describe('getActiveSeason', () => {
  it('returns the season active at the supplied time', () => {
    expect(getActiveSeason(seasons, new Date('2026-08-21T00:00:00.000Z'))).toBe(
      seasons[1],
    )
  })

  it('returns undefined when none is active', () => {
    expect(
      getActiveSeason(seasons, new Date('2026-09-01T00:00:00.000Z')),
    ).toBeUndefined()
  })
})

describe('getCurrentSeason', () => {
  it('returns the season active at the supplied time', () => {
    expect(
      getCurrentSeason(seasons, new Date('2026-08-21T00:00:00.000Z')),
    ).toBe(seasons[1])
  })

  it('includes the season end date', () => {
    expect(
      getCurrentSeason(seasons, new Date('2026-08-30T00:00:00.000Z')),
    ).toBe(seasons[1])
  })

  it('falls back to the first season when none is active', () => {
    expect(
      getCurrentSeason(seasons, new Date('2026-09-01T00:00:00.000Z')),
    ).toBe(seasons[0])
  })

  it('returns undefined for an empty season list', () => {
    expect(getCurrentSeason([])).toBeUndefined()
  })
})

describe('getPreviousSeason', () => {
  it('returns the most recently completed season before the supplied date', () => {
    expect(
      getPreviousSeason(seasons, new Date('2026-08-21T00:00:00.000Z')),
    ).toBe(seasons[0])
  })

  it('returns undefined when no season has completed before the supplied date', () => {
    expect(
      getPreviousSeason(seasons, new Date('2026-08-05T00:00:00.000Z')),
    ).toBeUndefined()
  })
})
