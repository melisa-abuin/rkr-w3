import React, { useState } from 'react'
import { Wrapper, Header, Button, Content } from './styled'

interface TabsProps {
  titles: string[]
  children: React.ReactNode[]
}

export default function Tabs({ titles, children }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <Wrapper>
      <Header>
        {titles.map((title, index) => (
          <Button
            key={title}
            active={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          >
            {title}
          </Button>
        ))}
      </Header>
      <Content>{children[activeIndex]}</Content>
    </Wrapper>
  )
}
