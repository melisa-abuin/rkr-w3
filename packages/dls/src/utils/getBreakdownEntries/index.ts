import { LeagueScoreboardBreakdown } from '@/interfaces/league'
import { formatKeyToWord } from '../formatKeyToWord'

export const getBreakdownEntries = (breakdown: LeagueScoreboardBreakdown) => {
  const entries = (
    Object.entries(breakdown) as [keyof LeagueScoreboardBreakdown, number][]
  ).filter(([key]) => key !== 'totalScore')
  const maxValue = Math.max(...entries.map(([, v]) => v))
  return entries.map(([key, value]) => ({
    label: formatKeyToWord(key),
    percentage: maxValue > 0 ? (value / maxValue) * 100 : 0,
    value,
  }))
}
