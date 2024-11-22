import React from 'react'
import { Container, Title } from './styled'

interface Props {
  battletag: string
}

export default function BattleTag({ battletag }: Props) {
  return (
    <Container>
      <Title>{battletag.split('#')[0]}</Title>
      {/* Removing battle tag for now until users agree to show it */}
      {/* <SubTitle>{battletag}</SubTitle> */}
    </Container>
  )
}
