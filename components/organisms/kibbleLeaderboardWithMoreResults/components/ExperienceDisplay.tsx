import {
  getLevelInfo,
  getStoredExp,
  LevelInfo,
  saveExp,
} from '@/utils/experience'
import { useEffect, useState } from 'react'

interface ExperienceDisplayProps {
  expGained?: number
}

export default function ExperienceDisplay({
  expGained = 0,
}: ExperienceDisplayProps) {
  const [levelInfo, setLevelInfo] = useState<LevelInfo>(() =>
    getLevelInfo(getStoredExp()),
  )

  useEffect(() => {
    const currentExp = getStoredExp()
    const newExp = currentExp + expGained
    saveExp(newExp)
    setLevelInfo(getLevelInfo(newExp))
  }, [expGained])

  return <>{`Level ${levelInfo.level} Kitty ${levelInfo.percentage}`}</>
}
