'use client'

import { usePrefersDarkMode } from '@/hooks/usePrefersDarkMode'
import Image from 'next/image'
import styles from './index.module.css'

interface StepProps {
  imageSrcSet?: {
    dark: string
    light: string
  }
  stepTitle?: string
  text: string
}

export default function Step({ imageSrcSet, stepTitle, text }: StepProps) {
  const prefersDarkMode = usePrefersDarkMode()

  //TODO: use srcSet images for mobile devices
  return (
    <div className={styles.container}>
      {stepTitle && <strong className={styles.stepCounter}>{stepTitle}</strong>}
      <p>{text}</p>
      {imageSrcSet && (
        <Image
          alt="Discord screenshot example"
          height={354}
          src={prefersDarkMode ? imageSrcSet.dark : imageSrcSet.light}
          width={640}
        />
      )}
    </div>
  )
}
