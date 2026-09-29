import Image from 'next/image'
import MinRowCard from '../minRowCard'
import styles from './index.module.css'

export default function IconSectionMobile() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.minRowCardContainer}>
        <Image
          alt="cat icon"
          className={styles.catIcon}
          height={56}
          src="/cat-icon.png"
          width={73}
        />
        <div className={`${styles.square} ${styles.bottomSquare}`} />
        <MinRowCard position={1} />
        <MinRowCard secondCard position={2} />
        <div className={styles.horizontalLine} />
      </div>
      <div className={`${styles.square} ${styles.rightSquare}`} />
    </div>
  )
}
