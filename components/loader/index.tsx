import { Background } from './styled'

interface Props {
  height?: number | string
  width?: number | string
}

export default function Loader({ height = 'auto', width = 'auto' }: Props) {
  return (
    <Background
      aria-busy="true"
      aria-valuetext="Loading..."
      role="progressbar"
      height={height}
      width={width}
    />
  )
}
