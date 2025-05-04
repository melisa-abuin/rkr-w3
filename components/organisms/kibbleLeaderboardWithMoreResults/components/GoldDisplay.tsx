import { getStoredGold, saveGold } from '@/utils/gold'
import { useEffect, useState } from 'react'

interface GoldDisplayProps {
  goldGained?: number
}

export default function GoldDisplay({ goldGained = 0 }: GoldDisplayProps) {
  const [currentGold, setCurrentGold] = useState<number>(() => getStoredGold())

  useEffect(() => {
    const newGold = getStoredGold() + goldGained
    saveGold(newGold)
    setCurrentGold(newGold)
  }, [goldGained])

  return <>{`Gold: ${currentGold}`}</>
}
