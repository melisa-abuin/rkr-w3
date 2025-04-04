import Image from 'next/image'
import styles from './not-found.module.css'

export default function Loading() {
  return (
    <div className={styles.wrapper}>
      <Image
        alt="loading-icon"
        height={96}
        priority
        width={96}
        src="/rkr-icon-gray.png"
      />
      <h1>Oops!</h1>
      <p>We can&apos;t seem to find the plage you are looking for.</p>
      <br />
      <a href="/" className={styles.link}>
        Go Back Home
      </a>
    </div>
  )
}
