import React, { ReactNode, useState } from 'react'
import { StyledTooltip, TooltipContainer } from './styled'
import TextWithIcon from '@/components/atoms/textWithIcon'

interface Props {
  data: {
    hard: number | string
    impossible: number | string
    normal: number | string
    children?: ReactNode
  }
}

export default function Tooltip({ data }: Props) {
  const { hard, impossible, normal, children } = data
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [showTooltip, setShowTooltip] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    setCoords({ x: e.clientX, y: e.clientY })
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
              <td>{normal}</td>
            </tr>
            <tr>
              <td>Hard</td>
              <td>{hard}</td>
            </tr>
            <tr>
              <td>Impossible</td>
              <td>{impossible}</td>
            </tr>
          </tbody>
        </table>
      </StyledTooltip>
    </TooltipContainer>
  )
}
