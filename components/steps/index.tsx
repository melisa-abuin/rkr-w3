'use client'

import React, { ReactNode } from 'react'
import { useState } from 'react'
import { ChevronContainer, Container, Dots, Dot, StepContainer } from './styled'
import { Chevron } from '../icons/chevron'
import { useTheme } from '@/hooks/useTheme'

interface Props {
  steps: ReactNode[]
}

export default function Steps({ steps }: Props) {
  const [currentStep, setCurrentStep] = useState(0)
  const [theme] = useTheme()
  const maxSteps = steps.length

  return (
    <Container>
      <StepContainer>
        <ChevronContainer
          onClick={() => setCurrentStep((step) => (step > 0 ? step - 1 : step))}
        >
          <Chevron
            fill={currentStep > 0 ? theme.text.primary : theme.text.secondary}
            height={30}
            width={30}
          />
        </ChevronContainer>
        <div>{steps[currentStep]}</div>
        <ChevronContainer
          onClick={() =>
            setCurrentStep((step) => (step < maxSteps - 1 ? step + 1 : step))
          }
        >
          <Chevron
            fill={
              currentStep < maxSteps - 1
                ? theme.text.primary
                : theme.text.secondary
            }
            flipped
            height={30}
            width={30}
          />
        </ChevronContainer>
      </StepContainer>
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
