'use client'

import Image from 'next/image'
import { Container, StepCounter } from './styled'

interface Props {
  imageSrc?: string
  stepTitle?: string
  text: string
}

export default function Step({ imageSrc, stepTitle, text }: Props) {
  //TODO: use srcSet images for mobile devices
  return (
    <Container>
      {stepTitle && <StepCounter>{stepTitle}</StepCounter>}
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
