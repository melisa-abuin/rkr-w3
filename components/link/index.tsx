'use client'

import React, { ReactNode } from 'react'
import { StyledLink } from './styled'

interface Props {
  withButtonStyle?: boolean
  href: string
  children: ReactNode
}

export default function Link({
  withButtonStyle = false,
  children,
  href,
}: Props) {
  return (
    <StyledLink withButtonStyle={withButtonStyle} href={href}>
      {children}
    </StyledLink>
  )
}
