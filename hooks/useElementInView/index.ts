import { useEffect, useRef, useState } from 'react'

export const useElementInView = (offsetTop = 0) => {
  const [isElementInView, setIsElementInView] = useState(true)
  const elementRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined' || !elementRef.current) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsElementInView(entry.isIntersecting)
      },
      {
        root: null,
        threshold: 0,
        rootMargin: `-${offsetTop}px 0px 0px 0px`,
      },
    )

    observer.observe(elementRef.current)

    return () => {
      observer.disconnect()
    }
  }, [offsetTop])

  return { isElementInView, elementRef }
}
