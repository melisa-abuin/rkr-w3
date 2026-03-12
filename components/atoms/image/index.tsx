import { ImageProps } from 'next/image'
import { useState } from 'react'
import { StyledImage } from './styled'

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

  return (
    <StyledImage
      $circular={circular}
      {...rest}
      $colored={colored}
      alt={alt}
      height={48}
      src={imgSrc}
      width={48}
      onError={() => {
        setImgSrc(fallbackSrc)
      }}
    />
  )
}
