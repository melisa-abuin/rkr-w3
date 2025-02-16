'use client'

import { useState } from 'react'
import Info from '../info'
import Modal from '../modal'
import { Button } from './styled'
import Steps from '../steps'
import Step from './components/Step'
import { discordGuideSteps } from '@/constants'

export default function Guide() {
  const [isModalOpen, setModalOpen] = useState(false)

  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  return (
    <Info>
      <strong>Can&apos;t find your stats?</strong>{' '}
      <Button onClick={openModal}>Click here</Button> to learn how to upload
      your game progress and get featured on the leaderboard!
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="How to Upload Your Stats"
      >
        <Steps
          steps={discordGuideSteps.map(({ text, imageSrc }, index) => (
            <Step imageSrc={imageSrc} key={index} text={text} />
          ))}
        />
      </Modal>
    </Info>
  )
}
