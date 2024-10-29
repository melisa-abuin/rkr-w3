import React, { ReactNode } from 'react'
import { StyledTooltip, TooltipContainer } from './styled'

interface Props {
  hard: number
  impossible: number
  normal: number
  children?: ReactNode
}

export default function Tooltip({ hard, impossible, normal, children }: Props) {
  return (
    <TooltipContainer>
      {children}

      <StyledTooltip>
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
