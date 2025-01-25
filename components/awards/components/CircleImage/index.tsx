import React, { useState } from 'react'
import { ImageProps } from 'next/image'
import { StyledImage } from './styled'

interface CircleImageProps extends ImageProps {
  completed: boolean
  fallbackSrc: string
}

export default function CircleImage({
  alt,
  completed,
  fallbackSrc,
  src,
  ...rest
}: CircleImageProps) {
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <StyledImage
      {...rest}
      alt={alt}
      height={48}
      completed={completed}
      width={48}
      src={imgSrc}
      onError={() => {
        setImgSrc(fallbackSrc)
      }}
    />
  )
}
