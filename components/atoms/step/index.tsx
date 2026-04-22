'use client'

import Image from 'next/image'
import styles from './index.module.css'
import { useTheme } from '@/hooks/useTheme'

interface Props {
  imageSrcSet?: {
    dark: string
    light: string
  }
  stepTitle?: string
  text: string
}

export default function Step({ imageSrcSet, stepTitle, text }: Props) {
  const [theme] = useTheme()

  //TODO: use srcSet images for mobile devices
  return (
    <div className={styles.container}>
      {stepTitle && <strong className={styles.stepCounter}>{stepTitle}</strong>}
      <p>{text}</p>
      {imageSrcSet && (
        <Image
          alt="Discord screenshot example"
          height={354}
          src={imageSrcSet[theme.name]}
          width={640}
        />
      )}
    </div>
  )
}
