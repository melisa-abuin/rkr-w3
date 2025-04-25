'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { Container, ImageWrapper, Text } from './styled'
import Lottie from 'lottie-react'
import animationData from '@/public/animations/spark.json'
import { getKibbleRewardMessage } from '@/utils/getKibbleRewardMessage'

type AnimationState = 'idle' | 'spark' | 'done'

export default function FloatingKibble() {
  const [animationState, setAnimationState] = useState<AnimationState>('idle')
  const [rewardMessage, setRewardMessage] = useState('')

  const handleClick = () => {
    setRewardMessage(getKibbleRewardMessage())
    setAnimationState('spark')
  }

  return (
    <Container collapsed={animationState === 'done'}>
      {animationState === 'idle' && (
        <>
          <ImageWrapper onClick={handleClick}>
            <Image alt="kibble" height={48} width={48} src="/kibble.png" />
          </ImageWrapper>
          <Text>Pick it up!</Text>
        </>
      )}
      {animationState === 'spark' && (
        <>
          <Lottie
            animationData={animationData}
            loop={false}
            autoplay
            onComplete={() => setAnimationState('done')}
            style={{ width: 64, height: 64 }}
          />
          <Text>{rewardMessage}</Text>
        </>
      )}
    </Container>
  )
}
