'use client'

import { InnerContainer, OuterContainer } from './styled'

export const PageContainer = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => (
  <OuterContainer>
    <InnerContainer>{children}</InnerContainer>
  </OuterContainer>
)
