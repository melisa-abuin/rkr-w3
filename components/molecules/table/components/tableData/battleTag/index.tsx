import React from 'react'
import { Container, SubTitle, Title } from './styled'
import { BattleTag as BattleTagI } from '@/interfaces/player'

interface Props {
  data: BattleTagI
}

export default function BattleTag({ data }: Props) {
  const { name, tag } = data

  return (
    <Container>
      <Title href={`/player/${encodeURIComponent(tag)}`}>{name}</Title>
      <SubTitle>{tag}</SubTitle>
    </Container>
  )
}
