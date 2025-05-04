import React from 'react'
import { Container, SubTitle } from './styled'
import { BattleTag as BattleTagI } from '@/interfaces/player'
import Link from '@/components/atoms/link'

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
      <Link color="brandSecondary" href={`/player/${encodeURIComponent(tag)}`}>
        {name}
      </Link>
      <SubTitle>{tag}</SubTitle>
    </Container>
  )
}
