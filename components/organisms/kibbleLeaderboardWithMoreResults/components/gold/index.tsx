import { getStoredGold, saveGold } from '@/utils'
import { useEffect, useState } from 'react'
import { Wrapper } from './styled'
import { Coins } from '@/components/icons/coins'
import { useTheme } from '@/hooks/useTheme'

interface Props {
  goldGained?: number
}

export default function Gold({ goldGained = 0 }: Props) {
  const [currentGold, setCurrentGold] = useState<number>(() => getStoredGold())
  const [theme] = useTheme()

  useEffect(() => {
    const newGold = getStoredGold() + goldGained
    saveGold(newGold)
    setCurrentGold(newGold)
  }, [goldGained])

  return (
    <Wrapper>
      <Coins fill={theme.color.yellow} height={16} width={16} /> {currentGold}
    </Wrapper>
  )
}
