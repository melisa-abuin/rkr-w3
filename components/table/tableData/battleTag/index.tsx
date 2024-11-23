import React from 'react'
import { Container, Title } from './styled'

interface Props {
  battletag: string
}

export default function BattleTag({ battletag }: Props) {
  /**
   * Showing the players battle tag is something we will need to agree on
   * let's remove it for now. If we would like to show the battle tag again we should replace the following html tags with
   * <Title>{battletag.split('#')[0]}</Title>
   * <SubTitle>{battletag}</SubTitle>
   */
  return (
    <Container>
      <Title>{battletag}</Title>
    </Container>
  )
}
