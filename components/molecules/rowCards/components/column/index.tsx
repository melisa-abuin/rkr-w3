import { Container, Description, Title } from './styled'
import React from 'react'

interface Props {
  value: number
  description: string
}

export default function Column({ value, description }: Props) {
  return (
    <Container>
      <Title>{value || 0}</Title>
      <Description>{description}</Description>
    </Container>
  )
}
