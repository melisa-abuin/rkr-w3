import { isHalloweenSeason } from '@/utils'
import Image from 'next/image'
import MinRowCard from '../minRowCard'
import styles from './index.module.css'

export default function IconSectionMobile() {
  const isHalloween = isHalloweenSeason()

  return (
    <div className={`${styles.wrapper} ${isHalloween ? styles.halloween : ''}`}>
      <div className={styles.minRowCardContainer}>
        <Image
          alt="cat icon"
          className={styles.catIcon}
          height={isHalloween ? 79 : 56}
          src={isHalloween ? '/cat-icon-halloween.png' : '/cat-icon.png'}
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
