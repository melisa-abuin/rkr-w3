'use client'

import React, { ReactNode } from 'react'
import { InnerContainer, OuterContainer, Title } from './styled'

interface Props {
  align?: 'center' | 'left'
  ariaLabelledby?: string
  as?: 'section' | 'div'
  children: ReactNode
  marginBottom?: number
  marginTop?: number
  title?: string
  withPadding?: boolean
}

export const PageContainer = ({
  align = 'left',
  ariaLabelledby,
  as = 'section',
  children,
  marginBottom = 0,
  marginTop = 0,
  withPadding = true,
  title,
}: Props) => (
  <OuterContainer
    aria-labelledby={ariaLabelledby}
    as={as}
    marginBottom={marginBottom}
    marginTop={marginTop}
    withPadding={withPadding}
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
