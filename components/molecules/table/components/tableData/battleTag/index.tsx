import React from 'react'
import { Container, SubTitle, Title } from './styled'
import { BattleTag as BattleTagI } from '@/interfaces/player'

/*
 * using this in each of the children of the tdata I can make it generic
 */
interface k {
  data: unknown
}

interface Props extends k {
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
