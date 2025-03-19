import React, { useCallback, useState } from 'react'
import Modal from '@/components/atoms/modal'
import Button from '@/components/atoms/button'
import Image from 'next/image'
import { ButtonGroup, Colored, Content } from './styled'
import { useTheme } from '@/hooks/useTheme'

interface Props {
  battletag: string
  date: string
}
export default function DownloadModal({ battletag, date }: Props) {
  const [theme] = useTheme()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)

    // TODO: create helper or what about react query?
    try {
      const response = await fetch('/api/downloadPlayerStats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          battleTag: encodeURIComponent(battletag),
        }),
      })

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

      setError(null)
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setLoading(false)
    }

    setIsModalOpen(false)
  }, [battletag])
  console.log(loading)
  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Download my stats</Button>
      {error && <p>Something went wrong</p>}
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
            <Button onClick={() => setIsModalOpen(false)} variant="secondary">
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
