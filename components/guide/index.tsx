'use client'

import { useState } from 'react'
import Info from '../info'
import Modal from '../modal'
import { Button } from './styled'
import Steps from '../steps'
import Step from './components/Step'

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
          steps={[
            <Step
              topText="Join the discord server if you haven't already, once there go to the #uploadstats channel"
              imageSrc="/discord-example.png"
              bottomText="You will be able to find it on the left side of the main messaging window"
              key={1}
            />,
            <Step
              topText="Once there, click on the + symbol that appears right next to the entry to send a message to attach a file"
              imageSrc="/discord-example2.png"
              bottomText="(Additionally, at the top of the window you will see that there is a button to view pinned messages, where you can find detailed instructions on how to upload your stats)"
              key={2}
            />,
            <Step
              topText="When you click on the option to upload a file, a window like this should appear on your screen (if you are using Windows as the operating system)"
              imageSrc="/discord-example3.png"
              bottomText="Open your 'documents' folder and there you will see a folder called 'Warcraft III', double click on it. Inside you will see more folders, repeat the same steps until you reach Documents > Warcraft III > CustomMapData > Run-Kitty-Run"
              key={3}
            />,
            <Step
              topText="Once you are in the directory specified above, you will see a text file named after your battletag"
              imageSrc="/discord-example4.png"
              bottomText="Select that file and press 'open'"
              key={4}
            />,
            <Step
              topText="You will see that in the discord chat window your file is attached to the message. Now all you have to do is write the '!upload' command"
              imageSrc="/discord-example5.png"
              bottomText="Send the message, and you will automatically receive a response from the Discord bot informing you if the action was successful or not."
              key={5}
            />,
            <Step
              topText="That would be all, if you still have problems loading your stats, consult with a member of the community"
              bottomText=""
              key={6}
            />,
          ]}
        />
      </Modal>
    </Info>
  )
}
