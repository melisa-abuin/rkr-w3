'use client'

import React, { useState } from 'react'
import { Wrapper, Header, Button, Content } from './styled'

interface TabsProps {
  children: React.ReactNode[]
  overrideSelectedIndex?: number | null
  titles: string[]
  onTabChange?: (newIndex: number) => void
}

export default function Tabs({
  titles,
  children,
  overrideSelectedIndex = null,
  onTabChange,
}: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const currentIndex =
    overrideSelectedIndex !== null ? overrideSelectedIndex : activeIndex

  const handleTabClick = (index: number) => {
    onTabChange?.(index)
    if (overrideSelectedIndex !== null) return

    setActiveIndex(index)
  }

  return (
    <Wrapper>
      <Header>
        {titles.map((title, index) => (
          <Button
            key={title}
            active={index === currentIndex}
            onClick={() => handleTabClick(index)}
          >
            {title}
          </Button>
        ))}
      </Header>
      <Content>{children[currentIndex]}</Content>
    </Wrapper>
  )
}
