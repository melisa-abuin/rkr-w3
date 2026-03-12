'use client'

import React, { useState } from 'react'
import { Wrapper, Header, Button, Content } from './styled'

interface TabsProps {
  children: React.ReactNode[]
  defaultIndex?: number | null
  titles: string[]
  onTabChange?: (newIndex: number) => void
}

export default function Tabs({
  titles,
  children,
  defaultIndex = null,
  onTabChange,
}: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(
    defaultIndex !== null ? defaultIndex : 0,
  )

  const handleTabClick = (index: number) => {
    onTabChange?.(index)
    setActiveIndex(index)
  }

  return (
    <Wrapper>
      <Header>
        {titles.map((title, index) => (
          <Button
            key={title}
            active={index === activeIndex}
            onClick={() => handleTabClick(index)}
          >
            {title}
          </Button>
        ))}
      </Header>
      <Content>{children[activeIndex]}</Content>
    </Wrapper>
  )
}
