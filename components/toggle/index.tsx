'use client'

import React, { ReactNode, useState } from 'react'
import { Container, Slider, Text } from './styled'

interface Props {
  initialValue?: boolean
  onToggle: (isToggled: boolean) => void
  iconOn: ReactNode
  iconOff: ReactNode
  textOn: string
  textOff: string
}

export default function Toggle({
  initialValue = false,
  onToggle,
  iconOn,
  iconOff,
  textOn,
  textOff,
}: Props) {
  const [isToggled, setIsToggled] = useState(initialValue)

  const handleToggle = () => {
    setIsToggled((prev) => !prev)
    onToggle && onToggle(isToggled)
  }

  return (
    <Container onClick={handleToggle} isToggled={isToggled}>
      <Slider isToggled={isToggled}>{isToggled ? iconOn : iconOff}</Slider>
      <Text isToggled={isToggled}>{isToggled ? textOn : textOff}</Text>
    </Container>
  )
}
