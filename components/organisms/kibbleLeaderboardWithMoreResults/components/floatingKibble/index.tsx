'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { Container, ImageWrapper, Text } from './styled'
import Lottie from 'lottie-react'
import animationData from '@/public/animations/spark.json'
import { getKibbleRewardMessage } from '@/utils/getKibbleRewardMessage'

export default function FloatingKibble() {
  const [showKibble, setShowKibble] = useState(true)
  const [showSpark, setShowSpark] = useState(false)
  const [rewardMessage, setRewardMessage] = useState('')

  const handleClick = () => {
    setRewardMessage(getKibbleRewardMessage())
    setShowKibble(false)
    setShowSpark(true)
  }

  return (
    <Container collapsed={!showKibble && !showSpark}>
      {showKibble && (
        <>
          <ImageWrapper onClick={handleClick}>
            <Image alt="kibble" height={48} width={48} src="/kibble.png" />
          </ImageWrapper>
          <Text>Pick it up!</Text>
        </>
      )}
      {!showKibble && showSpark && (
        <>
          <Lottie
            animationData={animationData}
            loop={false}
            autoplay
            onComplete={() => setShowSpark(false)}
            style={{ width: 64, height: 64 }}
          />
          <Text>{rewardMessage}</Text>
        </>
      )}
    </Container>
  )
}
