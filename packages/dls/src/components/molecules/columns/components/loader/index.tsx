import Loader from '@/components/atoms/loader'
import styles from '../../index.module.css'

interface LoaderColumnsProps {
  variant: 'primary' | 'secondary'
}

export default function LoaderColumns({ variant }: LoaderColumnsProps) {
  const containerClassName = `${styles.container} ${styles[variant]}`

  return (
    <div className={containerClassName}>
      {[...Array(5)].map((_, rowIndex) => (
        <div key={rowIndex} className={styles.col}>
          <Loader height={30} variant="secondary" width={'80%'} />
          <Loader height={30} variant="secondary" width={'80%'} />
          <Loader height={20} variant="secondary" width={'80%'} />
        </div>
      ))}
    </div>
  )
}
