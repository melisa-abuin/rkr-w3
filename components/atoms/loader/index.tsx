import { Background } from './styled'

interface Props {
  height?: number | string
  variant?: 'primary' | 'secondary'
  width?: number | string
}

export default function Loader({
  height = 'auto',
  variant = 'primary',
  width = 'auto',
}: Props) {
  return (
    <Background
      aria-busy="true"
      aria-valuetext="Loading..."
      height={height}
      role="progressbar"
      variant={variant}
      width={width}
    />
  )
}
