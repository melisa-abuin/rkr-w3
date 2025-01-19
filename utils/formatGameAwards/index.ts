export const formatGameAwards = (awards: Record<string, number>) =>
  Object.entries(awards).map(([key, value]) => ({
    id: key,
    awards: Object.entries(value).map(([auraKey, auraValue]) => ({
      id: `${auraKey[0].toLowerCase()}${auraKey.slice(1)}`,
      completed: auraValue === 1,
      description: 'Description not available',
      imagePath: `/awards/${auraKey[0].toLowerCase()}${auraKey.slice(1)}.png`,
    })),
  }))
