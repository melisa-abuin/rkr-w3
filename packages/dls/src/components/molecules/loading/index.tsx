import Image from 'next/image'

import styles from './index.module.css'

type Props = {
  title: string
}

export default function Loading({ title }: Props) {
  return (
    <div className={styles.wrapper}>
      <Image
        priority
        alt="loading-icon"
        height={96}
        sizes="96px"
        src="/rkr-icon-gray-x120.png"
        width={96}
      />
      {title}
      <br />
      <div className={styles.progressContainer}>
        <Image
          priority
          alt="loading-progress"
          height={60}
          src="/screen-loading.gif"
          width={200}
        />
      </div>
    </div>
  )
}
