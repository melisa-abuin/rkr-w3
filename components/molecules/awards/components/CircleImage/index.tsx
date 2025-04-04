import { ImageProps } from 'next/image'
import { useState } from 'react'
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
      $complete={completed}
      height={48}
      onError={() => {
        setImgSrc(fallbackSrc)
      }}
      src={imgSrc}
      width={48}
    />
  )
}
