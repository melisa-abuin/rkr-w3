'use client'

import Image from 'next/image'
import { Container } from './styled'

interface Props {
  imageSrc?: string
  text: string
}

export default function Step({ imageSrc, text }: Props) {
  return (
    <Container>
      <p>{text}</p>
      {imageSrc && (
        <Image
          alt="Discord screenshot example"
          height={354}
          src={imageSrc}
          width={640}
        />
      )}
    </Container>
  )
}
