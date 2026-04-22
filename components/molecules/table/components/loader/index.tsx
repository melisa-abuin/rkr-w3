import LoaderSkeleton from '@/components/atoms/loader'
import styles from './index.module.css'

interface Props {
  columns: number
  rows: number
}

export default function Loader({ columns, rows }: Props) {
  return (
    <tbody>
      {[...Array(rows)].map((_, rowIndex) => (
        <tr key={rowIndex}>
          {[...Array(columns)].map((_, cellIndex) => (
            <td key={cellIndex} className={styles.td}>
              <br />
              <LoaderSkeleton height={20} />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}
