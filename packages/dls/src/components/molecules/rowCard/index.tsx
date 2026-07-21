import PositionNumber from '@/components/atoms/positionNumber'
import { ReactNode } from 'react'
import styles from './index.module.css'

export type RowCardVariant = 'default' | 'highlight'

interface RowCardProps {
  position?: number
  ariaLabel?: string
  className?: string
  variant?: RowCardVariant
  isSmallPosition?: boolean
  children: ReactNode
}

export default function RowCard({
  position,
  ariaLabel,
  className,
  variant = 'default',
  isSmallPosition = false,
  children,
}: RowCardProps) {
  const cardClassName = `${styles.card} ${
    variant === 'highlight' ? styles.cardHighlight : ''
  } ${className || ''}`

  const withPosition = position !== undefined && position !== null

  const ariaLabelValue = withPosition
    ? ariaLabel || `Position card ${position}`
    : ariaLabel || 'Row card'

  return (
    <div aria-label={ariaLabelValue} className={cardClassName}>
      {withPosition && (
        <PositionNumber isSmall={isSmallPosition} pos={position} />
      )}
      <div className={styles.contentContainer}>{children}</div>
    </div>
  )
}
