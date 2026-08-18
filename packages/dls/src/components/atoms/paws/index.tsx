import { Paw } from '@/components/icons/paw'
import { SoloPaw } from '@/components/icons/soloPaw'
import styles from './index.module.css'

interface PawsProps {
  color?: string
  difficulty: string
}

const difficultyPawCounter = {
  normal: 1,
  hard: 2,
  impossible: 3,
  nightmare: 4,
  progressive: 3,
}

export default function Paws({ color, difficulty }: PawsProps) {
  const difficultyValue = difficulty.toLocaleLowerCase()

  if (difficultyValue === 'solo')
    return <SoloPaw fill={'var(--color-solo)'} height={20} width={20} />

  if (difficultyValue in difficultyPawCounter === false) return null

  return (
    <div className={styles.row}>
      {[
        ...Array(
          difficultyPawCounter[
            difficultyValue as keyof typeof difficultyPawCounter
          ],
        ),
      ].map((_, rowIndex) => {
        const size = difficultyValue === 'progressive' ? 16 + rowIndex * 2 : 20
        return (
          <Paw
            key={rowIndex}
            fill={color || `var(--color-${difficultyValue})`}
            height={size}
            width={size}
          />
        )
      })}
    </div>
  )
}
