import React, { ReactNode } from 'react'
import styles from './index.module.css'
import TextWithIcon from '@/components/atoms/textWithIcon'
import { Difficulty } from '@/interfaces/difficulty'
import { formatSecondsAsTime } from '@/utils'
import TooltipComponent from '@/components/atoms/tooltip'
import { BestTime } from '@/interfaces/player'
import Paws from '@/components/atoms/paws'

const getObjectKeys = Object.keys as <T extends object>(
  obj: T,
) => Array<keyof T>

interface Props {
  data: {
    hard: number | string
    impossible: number | string
    nightmare: number | string
    normal: number | string
    progressive: number | string
  }
  best?: BestTime
  difficulty?: Difficulty
  children?: ReactNode
}

export default function Tooltip({
  data,
  best,
  children,
  difficulty = undefined,
}: Props) {
  const isTimeStats = !!best
  const { hard, impossible, normal, nightmare, progressive } = data
  const dataToRender = { ...data }

  if (isTimeStats) {
    dataToRender.hard = formatSecondsAsTime(hard as number)
    dataToRender.impossible = formatSecondsAsTime(impossible as number)
    dataToRender.normal = formatSecondsAsTime(normal as number)
    dataToRender.nightmare = formatSecondsAsTime(nightmare as number)
    dataToRender.progressive = formatSecondsAsTime(progressive as number)
  }

  if (difficulty && difficulty !== 'solo') {
    return <>{dataToRender[difficulty]}</>
  }

  return (
    <TooltipComponent
      ariaLabel="Extended stats"
      body={
        <table className={styles.content}>
          <tbody>
            {getObjectKeys(dataToRender).map((key) => (
              <tr key={key}>
                <td className={styles.td}>{key}</td>
                <td>{dataToRender[key]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    >
      <div className={styles.text}>
        <TextWithIcon iconName="information" iconSize={12}>
          {best ? (
            <div className={styles.column}>
              <p className={styles.title}>{formatSecondsAsTime(best.time)}</p>
              <p className={styles.subtitle}>({best.difficulty})</p>
              <Paws difficulty={best.difficulty} />
            </div>
          ) : (
            children
          )}
        </TextWithIcon>
      </div>
    </TooltipComponent>
  )
}
