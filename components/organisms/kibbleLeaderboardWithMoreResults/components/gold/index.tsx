import { getStoredGold, saveGold } from '@/utils/gold'
import { useEffect, useState } from 'react'

interface Props {
  goldGained?: number
}

export default function Gold({ goldGained = 0 }: Props) {
  const [currentGold, setCurrentGold] = useState<number>(() => getStoredGold())

  useEffect(() => {
    const newGold = getStoredGold() + goldGained
    saveGold(newGold)
    setCurrentGold(newGold)
  }, [goldGained])

  return <>{`Gold: ${currentGold}`}</>
}
