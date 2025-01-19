'use client'

import { Awards as AwardsI } from '@/interfaces/player'
import { Body, Header, Line, Section, SectionContainer, Title } from './styled'
import Tooltip from './components/tooltip'
import CircleImage from './components/CircleImage'

interface Props {
  awards: AwardsI[]
}
export default function Awards({ awards }: Props) {
  return (
    <div>
      <Header>Game Awards</Header>
      <Body>
        {awards.map(({ id, awards }) => (
          <SectionContainer key={id}>
            <Title>
              {id}
              <Line />
            </Title>

            <Section>
              {awards.map(({ id, completed, imagePath }) => (
                <Tooltip key={id}>
                  <CircleImage
                    alt={id}
                    completed={completed}
                    fallbackSrc="/awards/fallback.png"
                    src={imagePath}
                  />
                </Tooltip>
              ))}
            </Section>
          </SectionContainer>
        ))}
      </Body>
    </div>
  )
}
