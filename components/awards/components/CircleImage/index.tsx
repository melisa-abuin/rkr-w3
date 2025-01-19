import React, { useState } from 'react'
import { ImageProps } from 'next/image'
import { StyledImage } from './styled'

interface ImageWithFallbackProps extends ImageProps {
  completed: boolean
  fallbackSrc: string
}

const ImageWithFallback = ({
  alt,
  completed,
  fallbackSrc,
  src,
  ...rest
}: ImageWithFallbackProps) => {
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

export default ImageWithFallback
