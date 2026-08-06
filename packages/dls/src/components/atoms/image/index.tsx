'use client'

import NextImage, { ImageProps } from 'next/image'
import { useState } from 'react'
import styles from './index.module.css'

type ColorName =
  | 'black'
  | 'brandPrimary'
  | 'brandSecondary'
  | 'green'
  | 'highlight'
  | 'primary'
  | 'secondary'
  | 'teal'
  | 'tertiary'
  | 'white'
  | 'yellow'

interface CustomImageProps extends ImageProps {
  colored: boolean
  circular?: boolean
  colorName?: ColorName
  fallbackSrc: string
  bordered?: boolean
}

export default function Image({
  alt,
  circular = false,
  colored = true,
  colorName = 'primary',
  fallbackSrc,
  src,
  bordered = true,
  ...rest
}: CustomImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const circularClass = circular ? styles.circular : styles.notCircular
  const coloredClass = colored ? styles.colored : styles.grayscale
  const borderClass = bordered ? styles.bordered : styles.notBordered
  const className = `${styles.image} ${circularClass} ${coloredClass} ${borderClass} ${styles[colorName]}`

  return (
    <NextImage
      {...rest}
      alt={alt}
      className={className}
      height={48}
      src={imgSrc}
      width={48}
      onError={() => {
        setImgSrc(fallbackSrc)
      }}
    />
  )
}
