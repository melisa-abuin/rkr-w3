export const formatGameAwards = (awards: Record<string, number>) =>
  Object.entries(awards).map(([key, value]) => ({
    id: `${key[0].toLowerCase()}${key.slice(1)}`,
    completed: value === 1,
    description: 'Description not available',
    imagePath: '',
  }))
