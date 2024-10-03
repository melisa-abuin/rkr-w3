import { useEffect, useRef } from 'react'
import { Video } from './styled'

interface Props {
  videoUrl?: string
}

export default function Player({ videoUrl }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    if (videoRef.current && videoUrl) {
      videoRef.current.load()
    }
  }, [videoUrl])

  if (!videoUrl) {
    return null
  }

  return (
    <Video autoPlay loop muted ref={videoRef} role="video">
      <source src={videoUrl} type="video/mp4" />
    </Video>
  )
}
