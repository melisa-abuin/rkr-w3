'use client'

import { Award } from '@/interfaces/player'
import { Body, CircleImage, Header } from './styled'

interface Props {
  awards: Award[]
}
export default function Awards({ awards }: Props) {
  return (
    <div>
      <Header>Game Awards</Header>
      <Body>
        {awards.map(({ id, completed }) => (
          <CircleImage
            alt="ewe"
            key={id}
            height={48}
            completed={completed}
            src="/image2.png"
            width={48}
          />
        ))}
      </Body>
    </div>
  )
}
