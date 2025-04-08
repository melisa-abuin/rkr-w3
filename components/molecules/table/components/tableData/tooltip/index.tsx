import React, { ReactNode } from 'react'
import { StyledTooltip, TooltipContainer } from './styled'
import TextWithIcon from '@/components/atoms/textWithIcon'

interface Props {
  hard: number | string
  impossible: number | string
  normal: number | string
  children?: ReactNode
}

export default function Tooltip({ hard, impossible, normal, children }: Props) {
  return (
    <TooltipContainer aria-label="Player stats extended details">
      <TextWithIcon iconName="information" iconSize={12}>
        {children}
      </TextWithIcon>

      <StyledTooltip role="tooltip">
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
