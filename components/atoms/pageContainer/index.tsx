'use client'

import React, { ReactNode } from 'react'
import { InnerContainer, OuterContainer, Title } from './styled'

interface Props {
  align?: 'center' | 'left'
  as?: 'section' | 'div'
  children: ReactNode
  ariaLabelledby?: string
  title?: string
  marginTop?: number
  marginBottom?: number
}

export const PageContainer = ({
  align = 'left',
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
      {title && (
        <Title align={align} id={ariaLabelledby}>
          {title}
        </Title>
      )}
      {children}
    </InnerContainer>
  </OuterContainer>
)
