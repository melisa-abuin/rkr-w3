import React, { useState } from 'react'
import Modal from '@/components/atoms/modal'
import Button from '@/components/atoms/button'
import Image from 'next/image'
import styles from './index.module.css'
import { usePreferredTheme } from '@/hooks/usePreferredTheme'
import { useToast } from '@/hooks/useToast'
import { useDownloadStats } from '@/hooks/useDownloadStats'
import { downloadBlobFile } from '@/utils/downloadBlobFile'

interface Props {
  battletag: string
  date: string
}

export default function DownloadModal({ battletag, date }: Props) {
  const [theme] = usePreferredTheme()
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
                  src={`/loading-${theme.name}.gif`}
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
