import React from 'react'
import { Container } from './styled'

interface Props {
  ratio: number
}

export default function Ratio({ ratio }: Props) {
  return <Container highlighted={ratio > 1}>{ratio}</Container>
}
