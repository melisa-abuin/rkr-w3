import LoaderSkeleton from '@/components/atoms/loader'
import styles from './index.module.css'

interface TableLoaderProps {
  columns: number
  rows: number
}

export default function Loader({ columns, rows }: TableLoaderProps) {
  return (
    <tbody>
      {[...Array(rows)].map((_, rowIndex) => (
        <tr key={rowIndex}>
          {[...Array(columns)].map((_, cellIndex) => (
            <td key={cellIndex} className={styles.td}>
              <br />
              <LoaderSkeleton height={20} variant="secondary" width="100%" />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}
