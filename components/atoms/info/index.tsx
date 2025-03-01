'use client'

import React, { ReactNode } from 'react'
import { Container, Text } from './styled'

interface Props {
  children: ReactNode
}

export default function Info({ children }: Props) {
  return (
    <Container>
      <Text>{children}</Text>
    </Container>
  )
}
