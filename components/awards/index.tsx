'use client'

import { Award } from '@/interfaces/player'
import { Body, CircleImage, Header, Section, Title } from './styled'

interface Props {
  awards: Award[]
}
export default function Awards({ awards }: Props) {
  return (
    <div>
      <Header>Game Awards</Header>
      <Body>
        <div>
          <Title>Wings</Title>
          <Section>
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
          </Section>
        </div>
      </Body>
    </div>
  )
}
