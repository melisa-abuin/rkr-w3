'use client'

import NextImage from 'next/image'
import { ImageProps } from 'next/image'
import { useState } from 'react'
import styles from './index.module.css'

interface Props extends ImageProps {
  colored: boolean
  circular?: boolean
  fallbackSrc: string
}

export default function Image({
  alt,
  circular = false,
  colored = true,
  fallbackSrc,
  src,
  ...rest
}: Props) {
  const [imgSrc, setImgSrc] = useState(src)
  const circularClass = circular ? styles.circular : styles.notCircular
  const coloredClass = colored ? styles.colored : styles.grayscale
  const className = `${styles.image} ${circularClass} ${coloredClass}`

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
