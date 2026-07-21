import { useEffect } from 'react'

export function useOutsideClick<T extends HTMLElement>(
  callback: () => void,
  ref: React.RefObject<T | null>,
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref?.current && !ref?.current.contains(event.target as Node)) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, callback])
}
