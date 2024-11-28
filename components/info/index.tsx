'use client'

import { Container, Text } from './styled'

interface Props {
  children: React.ReactNode
}

export default function Info({ children }: Props) {
  return (
    <Container>
      <Text>{children}</Text>
    </Container>
  )
}
