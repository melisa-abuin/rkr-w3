'use client'

import React, { useState } from 'react'
import { Wrapper, Header, Button, Content } from './styled'

interface TabsProps {
  children: React.ReactNode[]
  disabledTabs?: string[]
  defaultSelectedIndex?: number
  titles: string[]
}

export default function Tabs({
  titles,
  children,
  disabledTabs,
  defaultSelectedIndex = 0,
}: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(defaultSelectedIndex)

  return (
    <Wrapper>
      <Header>
        {titles.map((title, index) => {
          // Remove this logic when kibble leaderboard is ready
          const isDisabled = disabledTabs?.find(
            (disabledTab) => disabledTab === title,
          )
          return (
            <Button
              key={title}
              active={index === activeIndex}
              onClick={() => setActiveIndex(isDisabled ? activeIndex : index)}
            >
              {title}
            </Button>
          )
        })}
      </Header>
      <Content>{children[activeIndex]}</Content>
    </Wrapper>
  )
}
