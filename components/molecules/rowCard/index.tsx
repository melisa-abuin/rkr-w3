import { ReactNode } from 'react'
import styles from './index.module.css'
import PositionNumber from '@/components/atoms/positionNumber'

export type RowCardVariant = 'default' | 'highlight'

interface Props {
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
}: Props) {
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
