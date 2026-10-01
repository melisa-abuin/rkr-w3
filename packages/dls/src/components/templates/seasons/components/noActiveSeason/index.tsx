import Image from 'next/image'
import styles from './index.module.css'

export default function NoActiveSeason() {
  return (
    <section className={styles.container}>
      <Image
        priority
        alt="rkr-icon"
        height={96}
        sizes="96px"
        src="/rkr-icon-gray-x120.png"
        width={96}
      />
      <p>No season is active at the moment</p>
    </section>
  )
}
