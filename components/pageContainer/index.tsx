'use client'

import { InnerContainer, OuterContainer } from './styled'

interface Props {
  as?: 'section' | 'div'
  children: React.ReactNode
  ariaLabelledby?: string
  marginTop?: number
}

export const PageContainer = ({
  as = 'section',
  children,
  ariaLabelledby,
  marginTop = 0,
}: Props) => (
  <OuterContainer
    as={as}
    aria-labelledby={ariaLabelledby}
    marginTop={marginTop}
  >
    <InnerContainer>{children}</InnerContainer>
  </OuterContainer>
)
