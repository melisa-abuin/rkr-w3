import { Video } from './styled'

interface Props {
  videoUrl?: string
}

export default function Player({ videoUrl }: Props) {
  if (!videoUrl) {
    return null
  }

  return (
    <Video autoPlay loop muted>
      <source src={videoUrl} type="video/mp4" />
    </Video>
  )
}
