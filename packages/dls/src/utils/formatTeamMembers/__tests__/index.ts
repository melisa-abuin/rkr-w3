import { makePlayer } from '@/mocks/data/tournaments'
import { formatTeamMembers } from '..'

describe('formatTeamMembers', () => {
  it('returns an empty string when there are no members', () => {
    expect(formatTeamMembers([])).toBe('')
  })

  it('returns the single name when there is 1 member', () => {
    expect(formatTeamMembers([makePlayer('Alpha#1', [])])).toBe('Alpha')
  })

  it('joins two names with a comma', () => {
    const members = [makePlayer('Alpha#1', []), makePlayer('Beta#2', [])]
    expect(formatTeamMembers(members)).toBe('Alpha, Beta')
  })

  it('joins exactly 3 names with commas and no overflow', () => {
    const members = [
      makePlayer('Alpha#1', []),
      makePlayer('Beta#2', []),
      makePlayer('Gamma#3', []),
    ]
    expect(formatTeamMembers(members)).toBe('Alpha, Beta, Gamma')
  })

  it('shows first 3 names and "and N more" when there are 4 members', () => {
    const members = [
      makePlayer('Alpha#1', []),
      makePlayer('Beta#2', []),
      makePlayer('Gamma#3', []),
      makePlayer('Delta#4', []),
    ]
    expect(formatTeamMembers(members)).toBe('Alpha, Beta, Gamma and 1 more')
  })

  it('counts all extra members beyond 3 in the overflow label', () => {
    const members = [
      makePlayer('Alpha#1', []),
      makePlayer('Beta#2', []),
      makePlayer('Gamma#3', []),
      makePlayer('Delta#4', []),
      makePlayer('Epsilon#5', []),
      makePlayer('Zeta#6', []),
    ]
    expect(formatTeamMembers(members)).toBe('Alpha, Beta, Gamma and 3 more')
  })
})
