import { formatDateToLocale, secondsToSexagesimal } from '@/utils'
import {
  Container,
  Description,
  Header,
  NameList,
  Row,
  Title,
  Wrapper,
} from './styled'
import PositionNumber from '@/components/atoms/positionNumber'
import Tooltip from '@/components/atoms/tooltip'
import Paws from '@/components/atoms/paws'
import { useTheme } from '@/hooks/useTheme'

interface CardProps {
  date: string
  difficulty: string
  position: number
  time: number
  teamMembers: string
  showDifficulty: boolean
}

export default function Card({
  date,
  difficulty,
  position,
  time,
  teamMembers,
  showDifficulty,
}: CardProps) {
  const members = teamMembers.replace(/#\d+/g, '')
  const matchDate = formatDateToLocale(date)
  const [theme] = useTheme()

  return (
    <Container>
      <Header>
        <PositionNumber pos={position} isSmall />
        <Wrapper>
          <Row>
            <Title>{secondsToSexagesimal(time)}</Title>
            {showDifficulty && (
              <Tooltip body={difficulty} ariaLabel="Difficulty">
                <Paws
                  color={theme.text.color.secondary}
                  difficulty={difficulty}
                />
              </Tooltip>
            )}
          </Row>

          <Description>{matchDate}</Description>
        </Wrapper>
      </Header>
      <NameList>{members}</NameList>
    </Container>
  )
}
