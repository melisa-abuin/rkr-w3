import { ReactNode } from 'react'
import styles from './index.module.css'
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
  const cardClassName = `${styles.card} ${
    variant === 'highlight' ? styles.cardHighlight : ''
  } ${className || ''}`

  return (
    <div
      aria-label={ariaLabel || `Position card ${position}`}
      className={cardClassName}
    >
      <PositionNumber isSmall={isSmallPosition} pos={position} />
      <div className={styles.contentContainer}>{children}</div>
    </div>
  )
}
