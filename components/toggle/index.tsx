'use client'

import React, { ReactNode, useState } from 'react'
import { Container, Slider, Text } from './styled'

interface Props {
  onToggle: () => void
  iconOn: ReactNode
  iconOff: ReactNode
  textOn: string
  textOff: string
}

export default function Toggle({
  onToggle,
  iconOn,
  iconOff,
  textOn,
  textOff,
}: Props) {
  const [isToggled, setIsToggled] = useState(false)

  const handleToggle = () => {
    setIsToggled((prev) => !prev)
    onToggle && onToggle()
  }

  return (
    <Container onClick={handleToggle} isToggled={isToggled}>
      <Slider isToggled={isToggled}>{isToggled ? iconOn : iconOff}</Slider>
      <Text isToggled={isToggled}>{isToggled ? textOn : textOff}</Text>
    </Container>
  )
}
