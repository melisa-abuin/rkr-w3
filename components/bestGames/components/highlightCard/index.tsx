import TextWithIcon from '@/components/atoms/textWithIcon'
import Position from '../position'
import { Container, DetailContainer, Name, Wrapper } from './styled'

export default function HighlightCard() {
  return (
    <Container>
      <Position pos={1} />
      <DetailContainer>
        <Wrapper>
          <TextWithIcon colorName="tertiary" iconName="clock" palette="text">
            25:23
          </TextWithIcon>
          <TextWithIcon colorName="secondary" iconName="paw" palette="text">
            Impossible
          </TextWithIcon>
        </Wrapper>
        <Wrapper>
          <Name>Stan</Name>
          <Name>Aches</Name>
          <Name>Fieryfox</Name>
          <Name>Yoshimaru</Name>
        </Wrapper>
      </DetailContainer>
    </Container>
  )
}
