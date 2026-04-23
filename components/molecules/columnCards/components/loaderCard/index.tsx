import Loader from '@/components/atoms/loader'
import styles from './index.module.css'
import columnCardStyles from '../../index.module.css'

export default function LoaderCard() {
  return (
    <div className={columnCardStyles.container}>
      {[...Array(5)].map((_, rowIndex) => (
        <div key={rowIndex} className={columnCardStyles.card}>
          <div className={columnCardStyles.header}>
            <Loader height={21} variant="secondary" width={100} />
          </div>
          <table className={columnCardStyles.table}>
            <tbody>
              {[...Array(5)].map((_, rowIndex) => (
                <tr key={rowIndex} className={styles.row}>
                  <td className={styles.td}>
                    <div className={styles.loaderContainer}>
                      <Loader height={17} width={70} />
                    </div>
                  </td>
                  <td className={styles.td}>
                    <div className={styles.loaderContainer}>
                      <Loader height={17} width={30} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={columnCardStyles.footer}>
            <Loader height={17} variant="secondary" width={70} />
          </div>
        </div>
      ))}
    </div>
  )
}
