import React from 'react'
import { Container, Title } from './styled'

interface Props {
  battleTag: string
}

export default function BattleTag({ battleTag }: Props) {
  /**
   * Showing the players battle tag is something we will need to agree on
   * let's remove it for now. If we would like to show the battle tag again we should replace the following html tags with
   * <Title>{battleTag.split('#')[0]}</Title>
   * <SubTitle>{battleTag}</SubTitle>
   */
  return (
    <Container>
      <Title>{battleTag}</Title>
    </Container>
  )
}
