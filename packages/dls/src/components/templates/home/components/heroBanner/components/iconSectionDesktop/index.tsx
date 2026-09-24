import Image from 'next/image'
import MinColumnCard from '../minColumnCard'
import MinRowCard from '../minRowCard'
import styles from './index.module.css'

export default function IconSectionDesktop() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.minColumnCardContainer}>
        <MinColumnCard />
        <div className={`${styles.square} ${styles.bottomSquare}`} />
        <MinColumnCard secondCard />
      </div>
      <div className={styles.minRowCardContainer}>
        <Image
          alt="cat icon"
          className={styles.catIcon}
          height={56}
          src="/cat-icon.png"
          width={73}
        />
        <div className={`${styles.square} ${styles.rightSquare}`} />
        <MinRowCard position={1} />
        <MinRowCard position={2} />
        <MinRowCard position={3} />
      </div>
      <div className={styles.verticalLine} />
    </div>
  )
}
