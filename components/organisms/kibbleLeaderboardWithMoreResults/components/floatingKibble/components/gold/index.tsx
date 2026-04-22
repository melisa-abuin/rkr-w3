import { getStoredGold, saveGold } from '@/utils'
import { useEffect, useState } from 'react'
import styles from './index.module.css'
import { Coins } from '@/components/icons/coins'
import { usePreferredTheme } from '@/hooks/usePreferredTheme'

interface Props {
  goldGained?: number
}

export default function Gold({ goldGained = 0 }: Props) {
  const [currentGold, setCurrentGold] = useState<number>(() => getStoredGold())
  const [theme] = usePreferredTheme()

  useEffect(() => {
    const newGold = getStoredGold() + goldGained
    saveGold(newGold)
    setCurrentGold(newGold)
  }, [goldGained])

  return (
    <div className={styles.wrapper}>
      <Coins fill={theme.color.yellow} height={16} width={16} /> {currentGold}
    </div>
  )
}
