import React, { useCallback, useState } from 'react'
import Modal from '@/components/atoms/modal'
import Button from '@/components/atoms/button'
import Image from 'next/image'
import { ButtonGroup, Colored, Content } from './styled'
import { useTheme } from '@/hooks/useTheme'
import { useToast } from '@/hooks/useToast'

interface Props {
  battletag: string
  date: string
}
export default function DownloadModal({ battletag, date }: Props) {
  const [theme] = useTheme()
  const { showToast } = useToast()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const fetchData = useCallback(async () => {
    setLoading(true)

    // TODO: create helper or what about react query?
    try {
      const response = await fetch(
        `/api/downloadPlayerStats/${encodeURIComponent(battletag)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const result = await response.blob()

      const a = document.createElement('a')
      a.href = URL.createObjectURL(result)
      a.download = `${battletag}.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(a.href)
    } catch (error) {
      showToast(`File download failed, please try again later.`)
    } finally {
      setLoading(false)
    }

    setIsModalOpen(false)
  }, [battletag, showToast])

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
            <Button onClick={fetchData}>
              {loading ? (
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
