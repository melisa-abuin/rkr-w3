import React, { ReactNode } from 'react'
import { Content, Text } from './styled'
import TextWithIcon from '@/components/atoms/textWithIcon'
import { Difficulty } from '@/interfaces/difficulty'
import { secondsToSexagesimal } from '@/utils'
import TooltipComponent from '@/components/atoms/tooltip'

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
  const dataToRender = { ...data }

  if (isTimeStats) {
    dataToRender.hard = secondsToSexagesimal(hard as number)
    dataToRender.impossible = secondsToSexagesimal(impossible as number)
    dataToRender.normal = secondsToSexagesimal(normal as number)
  }

  if (difficulty) {
    return <>{dataToRender[difficulty]}</>
  }

  return (
    <TooltipComponent
      ariaLabel="Extended stats"
      body={
        <Content>
          <tbody>
            <tr>
              <td>Normal</td>
              <td>{dataToRender.normal}</td>
            </tr>
            <tr>
              <td>Hard</td>
              <td>{dataToRender.hard}</td>
            </tr>
            <tr>
              <td>Impossible</td>
              <td>{dataToRender.impossible}</td>
            </tr>
          </tbody>
        </Content>
      }
    >
      <Text>
        <TextWithIcon iconName="information" iconSize={12}>
          {children}
        </TextWithIcon>
      </Text>
    </TooltipComponent>
  )
}
