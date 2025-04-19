import React, { useState } from 'react'
import { Wrapper, Header, Button, Content } from './styled'

interface TabsProps {
  disabledTabs?: string[]
  titles: string[]
  children: React.ReactNode[]
}

export default function Tabs({ titles, children, disabledTabs }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(0)

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
