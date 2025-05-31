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
import { Paw } from '@/components/icons/paw'
import Tooltip from '@/components/atoms/tooltip'
import { useTheme } from '@/hooks/useTheme'

interface CardProps {
  date: string
  difficulty: string
  position: number
  time: number
  teamMembers: string
  showDifficulty: boolean
}

const difficultyPawCounter = {
  normal: 1,
  hard: 2,
  impossible: 3,
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
  const difficultyValue = difficulty.toLocaleLowerCase()

  if (difficultyValue in difficultyPawCounter === false) return null

  return (
    <Container>
      <Header>
        <PositionNumber pos={position} isSmall />
        <Wrapper>
          <Row>
            <Title>{secondsToSexagesimal(time)}</Title>
            {showDifficulty && (
              <div>
                {[
                  ...Array(
                    difficultyPawCounter[
                      difficultyValue as keyof typeof difficultyPawCounter
                    ],
                  ),
                ].map((_, rowIndex) => (
                  <Tooltip body={difficulty} key={rowIndex}>
                    <Paw
                      height={16}
                      fill={theme.text.color.secondary}
                      width={16}
                    />
                  </Tooltip>
                ))}
              </div>
            )}
          </Row>

          <Description>{matchDate}</Description>
        </Wrapper>
      </Header>
      <NameList>{members}</NameList>
    </Container>
  )
}
