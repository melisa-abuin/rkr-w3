'use client'

import { InnerContainer, OuterContainer, Title } from './styled'

interface Props {
  as?: 'section' | 'div'
  children: React.ReactNode
  ariaLabelledby?: string
  title?: string
  marginTop?: number
}

export const PageContainer = ({
  as = 'section',
  children,
  ariaLabelledby,
  title,
  marginTop = 0,
}: Props) => (
  <OuterContainer
    as={as}
    aria-labelledby={ariaLabelledby}
    marginTop={marginTop}
  >
    <InnerContainer>
      {title && <Title id={ariaLabelledby}>{title}</Title>}
      {children}
    </InnerContainer>
  </OuterContainer>
)
