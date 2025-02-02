'use client'

import React, { ReactNode } from 'react'
import { useState } from 'react'
import { Container, Dots, Dot } from './styled'

interface Props {
  steps: ReactNode[]
}

export default function Steps({ steps }: Props) {
  const [currentStep, setCurrentStep] = useState(0)

  return (
    <Container>
      <div>{steps[currentStep]}</div>
      <Dots>
        {steps.map((_, index) => (
          <Dot
            key={index}
            onClick={() => setCurrentStep(index)}
            selected={currentStep === index}
          />
        ))}
      </Dots>
    </Container>
  )
}
