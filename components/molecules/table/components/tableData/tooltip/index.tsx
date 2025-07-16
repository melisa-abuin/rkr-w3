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
    nightmare: number | string
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
  const { hard, impossible, normal, nightmare } = data
  const dataToRender = { ...data }

  if (isTimeStats) {
    dataToRender.hard = secondsToSexagesimal(hard as number)
    dataToRender.impossible = secondsToSexagesimal(impossible as number)
    dataToRender.normal = secondsToSexagesimal(normal as number)
    dataToRender.nightmare = secondsToSexagesimal(nightmare as number)
  }

  if (difficulty && difficulty !== 'solo') {
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
            <tr>
              <td>Nightmare</td>
              <td>{dataToRender.nightmare}</td>
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
