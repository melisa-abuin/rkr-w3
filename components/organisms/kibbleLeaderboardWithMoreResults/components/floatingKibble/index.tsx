'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { Container, ImageWrapper, Text } from './styled'
import Lottie from 'lottie-react'
import animationData from '@/public/animations/spark.json'

const getKibbleRewardMessage = () => {
  const xpMax = 350
  const goldMax = 150
  const jackpotMin = 600
  const jackpotMax = 1500

  const randomChance = getRandomInt(1, 100)

  if (randomChance <= 30) {
    const jackpotChance = getRandomInt(1, 100)

    if (jackpotChance <= 1) {
      const superJackpotGold = getRandomInt(jackpotMax, jackpotMax + 500)
      return `+${superJackpotGold} gold (super jackpot)`
    } else if (jackpotChance <= 3) {
      const jackpotGold = getRandomInt(jackpotMin, jackpotMax)
      return `+${jackpotGold} gold (jackpot)`
    } else {
      const goldAmount = getRandomInt(1, goldMax)
      return `+${goldAmount} gold`
    }
  } else if (randomChance <= 60) {
    const xpAmount = getRandomInt(50, xpMax)
    return `+${xpAmount} xp`
  } else {
    return 'Nothing!'
  }
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

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
