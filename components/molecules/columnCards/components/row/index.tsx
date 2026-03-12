import { formatSecondsAsTime } from '@/utils'
import { Tr, BaseTd, HoverTd, Td } from './styled'
import { BattleTag, BestTime } from '@/interfaces/player'
import Link from '@/components/atoms/link'

interface Props {
  player?: BattleTag
  hoverable: boolean
  data?: number | BestTime
  isSelected?: boolean
}

const isBestTime = (data: number | BestTime): data is BestTime => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'time' in data &&
    'difficulty' in data
  )
}

export default function Row({ player, data, hoverable, isSelected }: Props) {
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
    <Tr hoverable={hoverable && isBestTime(data)} isSelected={isSelected}>
      <BaseTd>
        <Link href={playerLink}>{player.name}</Link>
      </BaseTd>
      {isBestTime(data) ? (
        <>
          <BaseTd>{formatSecondsAsTime(data.time)}</BaseTd>
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
