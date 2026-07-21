import ColorBadge from '@/components/atoms/colorBadge'
import Tooltip from '@/components/atoms/tooltip'
import { BadgeColor } from '@/interfaces/theme'
import { ReactNode } from 'react'

interface ColorBadgeWithTooltipProps {
  body: ReactNode
  children: ReactNode
  colorName?: BadgeColor | null
}

export default function ColorBadgeWithTooltip({
  body,
  children,
  colorName,
}: ColorBadgeWithTooltipProps) {
  return (
    <Tooltip body={body}>
      <ColorBadge colorName={colorName}>{children}</ColorBadge>
    </Tooltip>
  )
}
