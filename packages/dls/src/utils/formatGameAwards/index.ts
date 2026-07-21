import { Award, AwardsDataFormatted } from '@/interfaces/award'

export const formatAwardsByCategory = (
  entries: Award[],
): AwardsDataFormatted => {
  const grouped = new Map<string, Award[]>()
  for (const entry of entries) {
    const bucket = grouped.get(entry.category) ?? []
    bucket.push(entry)
    grouped.set(entry.category, bucket)
  }
  return Array.from(grouped.entries()).map(([category, awards]) => ({
    id: category,
    awards: awards
      .filter((entry) => entry.status !== -1)
      .map((entry) => ({
        id: `${entry.key[0].toLowerCase()}${entry.key.slice(1)}`,
        description: entry.description,
        completed: entry.status === 1,
        imagePath: `/awards/${entry.key[0].toLowerCase()}${entry.key.slice(1)}.png`,
        title: entry.displayName,
        percentage: entry.percentage,
      })),
  }))
}
