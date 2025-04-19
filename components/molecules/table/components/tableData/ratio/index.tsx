import React from 'react'
import { Container } from './styled'

interface Props {
  data: number
}

export default function Ratio({ data }: Props) {
  return <Container highlighted={data > 1}>{data}</Container>
}
