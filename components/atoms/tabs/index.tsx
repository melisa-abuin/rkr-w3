'use client'

import React, { useState } from 'react'
import { Wrapper, Header, Button, Content } from './styled'

interface TabsProps {
  children: React.ReactNode[]
  defaultSelectedIndex?: number
  titles: string[]
  onTabChange?: (newIndex: number) => void
}

export default function Tabs({
  titles,
  children,
  defaultSelectedIndex = 0,
  onTabChange,
}: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(defaultSelectedIndex)

  const handleTabClick = (index: number) => {
    setActiveIndex(index)
    onTabChange?.(index)
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
