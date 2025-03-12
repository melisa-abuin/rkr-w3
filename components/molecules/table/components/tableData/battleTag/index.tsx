import React from 'react'
import { Container, SubTitle, Title } from './styled'
import { BattleTag as BattleTagI } from '@/interfaces/player'

interface Props {
  battleTag: BattleTagI
}

export default function BattleTag({ battleTag }: Props) {
  const { name, tag } = battleTag

  return (
    <Container>
      <Title href={`/player/${encodeURIComponent(tag)}`}>{name}</Title>
      <SubTitle>{tag}</SubTitle>
    </Container>
  )
}
