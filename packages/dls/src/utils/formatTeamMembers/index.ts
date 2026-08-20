import { TournamentTeamMember } from '@/interfaces/tournament'

const MAX_VISIBLE = 3

export const formatTeamMembers = (members: TournamentTeamMember[]): string => {
  const visible = members.slice(0, MAX_VISIBLE).map((m) => m.battleTag.name)
  const rest = members.length - MAX_VISIBLE
  return rest > 0
    ? `${visible.join(', ')} and ${rest} more`
    : visible.join(', ')
}
