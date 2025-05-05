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

  useEffect(() => {
    const currentExp = getStoredExp()
    const newExp = currentExp + expGained
    saveExp(newExp)
    setLevelInfo(getLevelInfo(newExp))
  }, [expGained])

  return (
    <Wrapper>
      <BarBackground>
        <BarFill style={{ width: `${levelInfo.percentage}%` }} />
        <Label>{`Level ${levelInfo.level} Kitty`}</Label>
      </BarBackground>
    </Wrapper>
  )
}
