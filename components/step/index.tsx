'use client'

import Image from 'next/image'
import { Container, StepCounter } from './styled'
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
    <Container>
      {stepTitle && <StepCounter>{stepTitle}</StepCounter>}
      <p>{text}</p>
      {imageSrcSet && (
        <Image
          alt="Discord screenshot example"
          height={354}
          src={imageSrcSet[theme.name]}
          width={640}
        />
      )}
    </Container>
  )
}
