import { Difficulty } from '@/interfaces/difficulty'

export const isRoundDifficultyAvailable = (
  round: string,
  difficulty: Difficulty | undefined,
) => {
  return !(
    difficulty === 'progressive' &&
    (round === 'roundFour' || round === 'roundFive')
  )
}
