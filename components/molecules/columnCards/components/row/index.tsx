import { secondsToSexagesimal } from '@/utils/secondsToSexagesimal'
import { LinkWrapper, Tr, TdWrapper, BaseTd, HoverTd, Td } from './styled'
import { BattleTag, BestTime } from '@/interfaces/player'

interface Props {
  player: BattleTag
  hoverable: boolean
  data: number | BestTime
}

export default function Row({ player, data, hoverable }: Props) {
  const isBestTime = data instanceof Object

  return (
    <Tr hoverable={hoverable && isBestTime}>
      <td colSpan={2}>
        <LinkWrapper href={`/player/${encodeURIComponent(player.tag)}`}>
          <TdWrapper>
            <BaseTd shouldFill>{player.name}</BaseTd>
            {isBestTime ? (
              <>
                <BaseTd>{secondsToSexagesimal(data.time)}</BaseTd>
                <HoverTd>{data.difficulty}</HoverTd>
              </>
            ) : (
              <Td>{data}</Td>
            )}
          </TdWrapper>
        </LinkWrapper>
      </td>
    </Tr>
  )
}
