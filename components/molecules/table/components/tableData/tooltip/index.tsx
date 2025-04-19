import React, { ReactNode, useState } from 'react'
import { StyledTooltip, TooltipContainer } from './styled'
import TextWithIcon from '@/components/atoms/textWithIcon'
import { Difficulty } from '@/interfaces/difficulty'
import { secondsToSexagesimal } from '@/utils/secondsToSexagesimal'

interface Props {
  data: {
    hard: number | string
    impossible: number | string
    normal: number | string
  }
  difficulty?: Difficulty
  children?: ReactNode
  isTimeStats?: boolean
}

export default function Tooltip({
  data,
  children,
  difficulty = undefined,
  isTimeStats = false,
}: Props) {
  const { hard, impossible, normal } = data
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [showTooltip, setShowTooltip] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    setCoords({ x: e.clientX, y: e.clientY })
  }

  if (difficulty) {
    return <>{data[difficulty]}</>
  }

  return (
    <TooltipContainer
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onMouseMove={handleMouseMove}
      aria-label="Player stats extended details"
    >
      <TextWithIcon iconName="information" iconSize={12}>
        {children}
      </TextWithIcon>

      <StyledTooltip
        showTooltip={showTooltip}
        x={coords.x}
        y={coords.y}
        role="tooltip"
      >
        <table>
          <tbody>
            <tr>
              <td>Normal</td>
              <td>
                {isTimeStats ? secondsToSexagesimal(normal as number) : normal}
              </td>
            </tr>
            <tr>
              <td>Hard</td>
              <td>
                {isTimeStats ? secondsToSexagesimal(hard as number) : hard}
              </td>
            </tr>
            <tr>
              <td>Impossible</td>
              <td>
                {isTimeStats
                  ? secondsToSexagesimal(impossible as number)
                  : impossible}
              </td>
            </tr>
          </tbody>
        </table>
      </StyledTooltip>
    </TooltipContainer>
  )
}
