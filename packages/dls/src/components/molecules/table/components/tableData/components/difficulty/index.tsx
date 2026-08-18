import Paws from '@/components/atoms/paws'
import styles from './index.module.css'

interface DifficultyDataProps {
  data: string
}

export default function DifficultyData({ data }: DifficultyDataProps) {
  return (
    <div className={styles.col}>
      {data}
      <Paws difficulty={data} />
    </div>
  )
}
