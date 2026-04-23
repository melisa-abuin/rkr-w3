'use client'

import animationData from '@/public/animations/spark.json'
import { getKibbleRewardMessage, Reward } from '@/utils'
import Lottie from 'lottie-react'
import Image from 'next/image'
import { useState } from 'react'
import Experience from './components/experience'
import Gold from './components/gold'
import styles from './index.module.css'

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
    <>
      <div
        className={`${styles.container} ${
          animationState === animationStates.done
            ? styles.containerCollapsed
            : ''
        }`}
      >
        {animationState === animationStates.idle && (
          <>
            <div className={styles.imageWrapper} onClick={handleClick}>
              <Image alt="kibble" height={48} src="/kibble.png" width={48} />
            </div>
            <p className={styles.text}>Pick it up!</p>
          </>
        )}
        {animationState === animationStates.spark && (
          <>
            <Lottie
              autoplay
              animationData={animationData}
              loop={false}
              style={{ width: 64, height: 64 }}
              onComplete={() => setAnimationState(animationStates.done)}
            />
            <p className={styles.text}>{rewardMessage}</p>
          </>
        )}
      </div>
      <div className={styles.wrapper}>
        <Experience expGained={expGained} />
        <Gold goldGained={goldGained} />
      </div>
    </>
  )
}
