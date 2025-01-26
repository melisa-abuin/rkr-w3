'use client'

import { Awards as AwardsI } from '@/interfaces/player'
import {
  Body,
  Conatiner,
  ErrorText,
  Header,
  Line,
  Section,
  SectionContainer,
  Title,
} from './styled'
import Tooltip from './components/tooltip'
import CircleImage from './components/CircleImage'

interface Props {
  awards: AwardsI[]
}
export default function Awards({ awards }: Props) {
  return (
    <Conatiner>
      <Header>Game Awards</Header>
      <Body>
        {awards.length > 0 ? (
          awards.map(({ id, awards }) => (
            <SectionContainer key={id}>
              <Title>
                {id}
                <Line />
              </Title>

              <Section>
                {awards.map(
                  ({ id, completed, description, imagePath, title }) => (
                    <Tooltip key={id} description={description} title={title}>
                      <CircleImage
                        alt={id}
                        completed={completed}
                        fallbackSrc="/awards/fallback.png"
                        src={imagePath}
                      />
                    </Tooltip>
                  ),
                )}
              </Section>
            </SectionContainer>
          ))
        ) : (
          <ErrorText>
            This player doesn&apos;t have any game awards available. <br />
            Please try updating your save file to the Discord server again or
            reach out to the page administrator for assistance.
          </ErrorText>
        )}
      </Body>
    </Conatiner>
  )
}
