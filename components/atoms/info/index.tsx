'use client'

import React, { ReactNode } from 'react'
import { Container, Text } from './styled'

interface Props {
  children: ReactNode
  as?: 'p' | 'ul'
}

export default function Info({ children, as = 'p' }: Props) {
  return (
    <Container>
      <Text as={as}>{children}</Text>
    </Container>
  )
}
