import { playerTimeColumns } from '@/constants'
import { Difficulty } from '@/interfaces/difficulty'
import { isRoundDifficultyAvailable } from '../isRoundDifficultyAvailable'

export const getPlayerTimeColumns = (difficulty: Difficulty) =>
  playerTimeColumns
    .filter(({ key }) => isRoundDifficultyAvailable(key, difficulty))
    .map(({ title, key }) => ({
      title,
      key: `${key}${difficulty.charAt(0).toUpperCase()}${difficulty.slice(1)}`,
    }))
