'use client'

import React, { ReactNode } from 'react'
import { StyledLink } from './styled'

interface Props {
  href: string
  children: ReactNode
}

export const Link = ({ href, children }: Props) => (
  <StyledLink href={href}>{children}</StyledLink>
)
