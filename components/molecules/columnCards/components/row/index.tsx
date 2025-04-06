import { secondsToSexagesimal } from '@/utils/secondsToSexagesimal'
import { LinkWrapper, Tr, BaseTd, HoverTd, Td } from './styled'
import { BattleTag, BestTime } from '@/interfaces/player'

interface Props {
  player?: BattleTag
  hoverable: boolean
  data?: number | BestTime
}

const isBestTime = (data: number | BestTime): data is BestTime => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'time' in data &&
    'difficulty' in data
  )
}

export default function Row({ player, data, hoverable }: Props) {
  const isEmptyRow = !player || data === undefined || data === null

  if (isEmptyRow) {
    return (
      <Tr>
        <Td>--</Td>
        <Td>--</Td>
      </Tr>
    )
  }
  const encodedTag = encodeURIComponent(player.tag)
  const playerLink = `/player/${encodedTag}`

  return (
    <Tr hoverable={hoverable && isBestTime(data)}>
      <BaseTd>
        <LinkWrapper href={playerLink}>{player.name}</LinkWrapper>
      </BaseTd>
      {isBestTime(data) ? (
        <>
          <BaseTd>{secondsToSexagesimal(data.time)}</BaseTd>
          <HoverTd>
            <LinkWrapper href={playerLink}>{data.difficulty}</LinkWrapper>
          </HoverTd>
        </>
      ) : (
        <Td>{data}</Td>
      )}
    </Tr>
  )
}
