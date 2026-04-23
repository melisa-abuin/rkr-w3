import React, { ReactNode, useState } from 'react'
import styles from './index.module.css'

interface Props {
  ariaLabel?: string
  body: ReactNode
  children: ReactNode
}

export default function Tooltip({ ariaLabel, body, children }: Props) {
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [showTooltip, setShowTooltip] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    setCoords({ x: e.clientX, y: e.clientY })
  }

  return (
    <div
      aria-label={ariaLabel || 'Tooltip'}
      className={styles.container}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onMouseMove={handleMouseMove}
    >
      {children}

      <div
        className={`${styles.tooltip} ${showTooltip ? styles.tooltipVisible : ''}`}
        role="tooltip"
        style={{ left: coords.x, top: coords.y }}
      >
        {body}
      </div>
    </div>
  )
}
