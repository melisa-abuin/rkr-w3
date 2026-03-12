interface BestGameTimes {
  HardGameTime: {
    Date: string
    TeamMembers: string
    Time: number
  }
  ImpossibleGameTime: {
    Date: string
    TeamMembers: string
    Time: number
  }
  NormalGameTime: {
    Date: string
    TeamMembers: string
    Time: number
  }
}

/**
 * Groups teammate names by how many times they appear across fastest game teams.
 *
 * It reads team members from normal/hard/impossible records, counts appearances,
 * excludes the current player (`battleTag`), and buckets names into:
 * - `1`: appeared once
 * - `2`: appeared twice
 * - `3`: appeared three or more times (capped)
 *
 * @param battleTag Current player tag to exclude from the result.
 * @param times Fastest game entries by difficulty.
 * @returns Object keyed by appearance count (`1 | 2 | 3`) with teammate names.
 */
export const getFastestBesties = (battleTag: string, times: BestGameTimes) => {
  const apparitions: Record<1 | 2 | 3, string[]> = {
    1: [],
    2: [],
    3: [],
  }

  if (!times) {
    return apparitions
  }
  const names = [
    ...times.HardGameTime.TeamMembers.split(', '),
    ...times.ImpossibleGameTime.TeamMembers.split(', '),
    ...times.NormalGameTime.TeamMembers.split(', '),
  ]

  const nameCounts: Record<string, number> = {}

  names.forEach((name) => {
    nameCounts[name] = (nameCounts[name] || 0) + 1
  })

  Object.entries(nameCounts).forEach(([name, count]) => {
    const validCount = Math.min(count, 3) as 1 | 2 | 3
    if (name && name !== battleTag) apparitions[validCount].push(name)
  })

  return apparitions
}
