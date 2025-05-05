'use client'

import animationData from '@/public/animations/spark.json'
import { getKibbleRewardMessage, Reward } from '@/utils'
import Lottie from 'lottie-react'
import Image from 'next/image'
import { useState } from 'react'
import ExperienceDisplay from '../experience'
import GoldDisplay from '../gold'
import { Container, ImageWrapper, Text } from './styled'

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
  const [expGained, setExpGained] = useState(0)
  const [goldGained, setGoldGained] = useState(0)

  const handleClick = () => {
    const reward: Reward = getKibbleRewardMessage()
    setRewardMessage(reward.message)

    // update xp or gold gained based on reward type
    setExpGained(reward.type === 'xp' ? reward.amount : 0)
    setGoldGained(reward.type === 'gold' ? reward.amount : 0)
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
      <ExperienceDisplay expGained={expGained} />
      <GoldDisplay goldGained={goldGained} />
    </Container>
  )
}
