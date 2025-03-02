'use client'

import React, { ReactNode } from 'react'
import { InnerContainer, OuterContainer, Title } from './styled'

interface Props {
  as?: 'section' | 'div'
  children: ReactNode
  ariaLabelledby?: string
  title?: string
  marginTop?: number
  marginBottom?: number
}

export const PageContainer = ({
  as = 'section',
  children,
  ariaLabelledby,
  title,
  marginTop = 0,
  marginBottom = 0,
}: Props) => (
  <OuterContainer
    as={as}
    aria-labelledby={ariaLabelledby}
    marginTop={marginTop}
    marginBottom={marginBottom}
  >
    <InnerContainer>
      {title && <Title id={ariaLabelledby}>{title}</Title>}
      {children}
    </InnerContainer>
  </OuterContainer>
)
