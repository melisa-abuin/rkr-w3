'use client'

import {
  Container,
  DesktopCardContainer,
  MobileCardContainer,
  Wrapper,
} from './styled'
import { secondsToSexagesimal } from '@/utils/secondsToSexagesimal'
import Card from './components/card'
import HighlightCard from './components/highlightCard'

export default function BestGames() {
  return (
    <Container>
      <DesktopCardContainer>
        <HighlightCard />
      </DesktopCardContainer>
      <MobileCardContainer>
        <Card />
      </MobileCardContainer>
      <Wrapper>
        <Card />
        <Card />
        <Card />
        <Card />
      </Wrapper>
    </Container>
  )
}
