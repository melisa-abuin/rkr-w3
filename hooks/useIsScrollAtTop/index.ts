import { useEffect, useState } from 'react'

export const useIsScrollAtTop = (): [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
] => {
  const [isScrollAtTop, setScrollIsAtTop] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setScrollIsAtTop(scrollY < 100)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return [isScrollAtTop, setScrollIsAtTop]
}
