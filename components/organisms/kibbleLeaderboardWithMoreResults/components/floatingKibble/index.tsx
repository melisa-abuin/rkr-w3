'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { Container, ImageWrapper, Text } from './styled'
import Lottie from 'lottie-react'
import animationData from '@/public/animations/spark.json'
import { getKibbleRewardMessage } from '@/utils/getKibbleRewardMessage'

type AnimationState = 'idle' | 'spark' | 'done'

const animationStates: Record<string, AnimationState> = {
  idle: 'idle',
  spark: 'spark',
  done: 'done',
}

export default function FloatingKibble() {
  const [animationState, setAnimationState] = useState<AnimationState>(
    animationStates.idle,
  )
  const [rewardMessage, setRewardMessage] = useState('')

  const handleClick = () => {
    setRewardMessage(getKibbleRewardMessage())
    setAnimationState(animationStates.spark)
  }

  return (
    <Container collapsed={animationState === animationStates.done}>
      {animationState === animationStates.idle && (
        <>
          <ImageWrapper onClick={handleClick}>
            <Image alt="kibble" height={48} width={48} src="/kibble.png" />
          </ImageWrapper>
          <Text>Pick it up!</Text>
        </>
      )}
      {animationState === animationStates.spark && (
        <>
          <Lottie
            animationData={animationData}
            loop={false}
            autoplay
            onComplete={() => setAnimationState(animationStates.done)}
            style={{ width: 64, height: 64 }}
          />
          <Text>{rewardMessage}</Text>
        </>
      )}
    </Container>
  )
}
