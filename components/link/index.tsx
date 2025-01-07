'use client'

import { StyledLink } from './styled'

interface Props {
  href: string
  children: React.ReactNode
}

export const Link = ({ href, children }: Props) => (
  <StyledLink href={href}>{children}</StyledLink>
)
