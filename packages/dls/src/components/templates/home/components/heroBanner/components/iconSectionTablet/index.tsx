import Image from 'next/image'
import MinColumnCard from '../minColumnCard'
import MinRowCard from '../minRowCard'
import styles from './index.module.css'

export default function IconSectionTablet() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.minColumnCardContainer}>
        <Image
          alt="cat icon"
          className={styles.catIcon}
          height={56}
          src="/cat-icon.png"
          width={73}
        />
        <MinColumnCard absolute />
        <div className={`${styles.square} ${styles.bottomSquare}`} />
        <div className={styles.minRowCardContainer}>
          <div className={`${styles.square} ${styles.rightSquare}`} />
          <MinRowCard position={1} />
          <MinRowCard position={2} />
        </div>
        <div className={styles.verticalLine} />
      </div>
    </div>
  )
}
