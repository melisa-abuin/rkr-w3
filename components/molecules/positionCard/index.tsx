import { ReactNode } from 'react'
import { Card, ContentContainer } from './styled'
import PositionNumber from '@/components/atoms/positionNumber'

export type PositionCardVariant = 'default' | 'highlight'

interface Props {
  position: number
  ariaLabel?: string
  className?: string
  variant?: PositionCardVariant
  isSmallPosition?: boolean
  children: ReactNode
}

export default function PositionCard({
  position,
  ariaLabel,
  className,
  variant = 'default',
  isSmallPosition = false,
  children,
}: Props) {
  return (
    <Card
      $variant={variant}
      aria-label={ariaLabel || `Position card ${position}`}
      className={className}
    >
      <PositionNumber isSmall={isSmallPosition} pos={position} />
      <ContentContainer>{children}</ContentContainer>
    </Card>
  )
}
