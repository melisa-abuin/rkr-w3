import {
  getLevelInfo,
  getStoredExp,
  LevelInfo,
  saveExp,
} from '@/utils/experience'
import { useEffect, useState } from 'react'
import { BarBackground, BarFill, Label, Wrapper } from './styled'

interface Props {
  expGained?: number
}

export default function Experience({ expGained = 0 }: Props) {
  const [levelInfo, setLevelInfo] = useState<LevelInfo>(() =>
    getLevelInfo(getStoredExp()),
  )
  const [barPercentage, setBarPercentage] = useState(levelInfo.percentage)
  const [disableTransition, setDisableTransition] = useState(false)

  useEffect(() => {
    const currentExp = getStoredExp()
    const newExp = currentExp + expGained
    const newLevelInfo = getLevelInfo(newExp)

    saveExp(newExp)

    const leveledUp = newLevelInfo.level > levelInfo.level

    if (leveledUp) {
      // Step 1: Animate to 100%
      setBarPercentage(100)

      // Step 2: Jump to 0 without animation
      setTimeout(() => {
        setDisableTransition(true)
        setBarPercentage(0)

        // Step 3: Animate to new % after a tiny delay
        setTimeout(() => {
          setDisableTransition(false)
          setLevelInfo(newLevelInfo)
          setBarPercentage(newLevelInfo.percentage)
        }, 50)
      }, 600)
    } else {
      setLevelInfo(newLevelInfo)
      setBarPercentage(newLevelInfo.percentage)
    }
  }, [expGained, levelInfo.level])

  return (
    <Wrapper>
      <BarBackground>
        <BarFill
          style={{ width: `${barPercentage}%` }}
          $noTransition={disableTransition}
        />
        <Label>{`Level ${levelInfo.level} Kitty`}</Label>
      </BarBackground>
    </Wrapper>
  )
}
