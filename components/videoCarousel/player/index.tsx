import { Video } from './styled'

export default function Player() {
  return (
    <Video autoPlay loop muted>
      <source src="/camera-angle.mp4" type="video/mp4" />
    </Video>
  )
}
