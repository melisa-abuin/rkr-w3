import { secondsToSexagesimal } from '@/utils'
import { Tr, BaseTd, HoverTd, Td } from './styled'
import { BattleTag, BestTime } from '@/interfaces/player'
import Link from '@/components/atoms/link'

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
        <Link href={playerLink}>{player.name}</Link>
      </BaseTd>
      {isBestTime(data) ? (
        <>
          <BaseTd>{secondsToSexagesimal(data.time)}</BaseTd>
          {hoverable && (
            <HoverTd>
              <Link href={playerLink}>{data.difficulty}</Link>
            </HoverTd>
          )}
        </>
      ) : (
        <Td>{data}</Td>
      )}
    </Tr>
  )
}
