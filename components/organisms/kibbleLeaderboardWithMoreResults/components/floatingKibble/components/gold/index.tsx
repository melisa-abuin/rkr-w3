import { Coins } from '@/components/icons/coins'
import { getStoredGold, saveGold } from '@/utils'
import { useEffect, useState } from 'react'
import styles from './index.module.css'

interface Props {
  goldGained?: number
}

export default function Gold({ goldGained = 0 }: Props) {
  const [currentGold, setCurrentGold] = useState<number>(() => getStoredGold())

  useEffect(() => {
    const newGold = getStoredGold() + goldGained
    saveGold(newGold)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentGold(newGold)
  }, [goldGained])

  return (
    <div className={styles.wrapper}>
      <Coins fill="var(--color-yellow)" height={16} width={16} /> {currentGold}
    </div>
  )
}
