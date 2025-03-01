'use client'

import React, { ReactNode } from 'react'
import { StyledLink } from './styled'

interface Props {
  withButtonStyle?: boolean
  href: string
  children: ReactNode
  target?: '_self' | '_blank'
  rel?: string
}

export default function Link({
  withButtonStyle = false,
  children,
  href,
  target = '_self',
  rel,
}: Props) {
  return (
    <StyledLink
      withButtonStyle={withButtonStyle}
      href={href}
      target={target}
      rel={rel}
    >
      {children}
    </StyledLink>
  )
}
