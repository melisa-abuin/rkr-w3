import React from 'react'
import { Container, SubTitle, Title } from './styled'

interface Props {
  battletag: string
}

export default function BattleTag({ battletag }: Props) {
  return (
    <Container>
      <Title>{battletag.split('#')[0]}</Title>
      <SubTitle>{battletag}</SubTitle>
    </Container>
  )
}
