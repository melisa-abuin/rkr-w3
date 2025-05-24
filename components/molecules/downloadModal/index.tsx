import React, { useState } from 'react'
import Modal from '@/components/atoms/modal'
import Button from '@/components/atoms/button'
import Image from 'next/image'
import { ButtonGroup, Colored, Content } from './styled'
import { useTheme } from '@/hooks/useTheme'
import { useToast } from '@/hooks/useToast'
import { useDownloadStats } from '@/hooks/useDownloadStats'
import { downloadBlobFile } from '@/utils/downloadBlobFile'

interface Props {
  battletag: string
  date: string
}

export default function DownloadModal({ battletag, date }: Props) {
  const [theme] = useTheme()
  const { showToast } = useToast()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const { mutate, isPending } = useDownloadStats()

  const handleDownload = () => {
    mutate(battletag, {
      onSuccess: (blob) => {
        downloadBlobFile(blob, `${battletag}.txt`)
        setIsModalOpen(false)
      },
      onError: () => {
        showToast('File download failed, please try again later.')
        setIsModalOpen(false)
      },
    })
  }

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Download my stats</Button>
      <Modal
        title="Download my file stats"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <Content>
          <div>
            <p>
              You are about to download the file containing{' '}
              <Colored>{battletag}</Colored>&apos;s stats, last updated on{' '}
              <Colored>{date}</Colored>.
            </p>
            <p>
              Once downloaded place it into your Documents/Warcraft
              III/CustomMapData/Run-Kitty-Run directory.
            </p>
            <p>
              Only download this file if you have lost your local stats file.
            </p>
          </div>
          <ButtonGroup>
            <Button onClick={() => setIsModalOpen(false)} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleDownload}>
              {isPending ? (
                <Image
                  alt="loading"
                  height={16}
                  src={`/loading-${theme.name}.gif`}
                  width={16}
                />
              ) : (
                'Proceed'
              )}
            </Button>
          </ButtonGroup>
        </Content>
      </Modal>
    </>
  )
}
