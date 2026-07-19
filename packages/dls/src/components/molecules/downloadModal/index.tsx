import Button from '@/components/atoms/button'
import Modal from '@/components/atoms/modal'
import { useDownloadStats } from '@/hooks/useDownloadStats'
import { usePrefersDarkMode } from '@/hooks/usePrefersDarkMode'
import { useToast } from '@/hooks/useToast'
import { downloadBlobFile } from '@/utils/downloadBlobFile'
import Image from 'next/image'
import { useState } from 'react'
import styles from './index.module.css'

interface DownloadModalProps {
  playerId: string
  battletag: string
  date: string
}

export default function DownloadModal({
  playerId,
  battletag,
  date,
}: DownloadModalProps) {
  const prefersDarkMode = usePrefersDarkMode()
  const { showToast } = useToast()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const { mutate, isPending } = useDownloadStats()

  const handleDownload = () => {
    mutate(playerId, {
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
      <Button colorName="secondary" onClick={() => setIsModalOpen(true)}>
        Download my stats
      </Button>
      <Modal
        isOpen={isModalOpen}
        title="Download my file stats"
        onClose={() => setIsModalOpen(false)}
      >
        <div className={styles.content}>
          <div>
            <p>
              You are about to download the file containing{' '}
              <strong className={styles.colored}>{battletag}</strong>&apos;s
              stats, last updated on{' '}
              <strong className={styles.colored}>{date}</strong>.
            </p>
            <p>
              Once downloaded place it into your Documents/Warcraft
              III/CustomMapData/Run-Kitty-Run directory.
            </p>
            <p>
              Only download this file if you have lost your local stats file.
            </p>
          </div>
          <div className={styles.buttonGroup}>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleDownload}>
              {isPending ? (
                <Image
                  alt="loading"
                  height={16}
                  src={
                    prefersDarkMode ? '/loading-dark.gif' : '/loading-light.gif'
                  }
                  width={16}
                />
              ) : (
                'Proceed'
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
