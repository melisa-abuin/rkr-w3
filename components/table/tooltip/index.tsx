import React from 'react'
import { StyledTooltip, TooltipContainer } from './styled'
import { calculateBestTimeByDifficulty } from '@/utils/calculateBestTimeByDifficulty'

interface Props {
  hard: number
  impossible: number
  normal: number
  shouldCalculate?: boolean
}

export default function Tooltip({
  hard,
  impossible,
  normal,
  shouldCalculate = false,
}: Props) {
  const bestTime = shouldCalculate
    ? calculateBestTimeByDifficulty({
        normal,
        hard,
        impossible,
      })
    : null
  return (
    <TooltipContainer>
      {bestTime ? (
        <div>
          {bestTime.time}
          <br />({bestTime.difficulty})
        </div>
      ) : (
        <>{hard + impossible + normal}</>
      )}

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
