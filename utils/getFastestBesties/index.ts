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
