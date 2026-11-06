import Bars from '@/components/atoms/bars'
import Button from '@/components/atoms/button'
import Image from '@/components/atoms/image'
import Modal from '@/components/atoms/modal'
import { Crown } from '@/components/icons/crown'
import { LeaguePodiumEntry } from '@/interfaces/league'
import { getBreakdownEntries, skinToImagePath } from '@/utils'
import { useState } from 'react'
import styles from './index.module.css'

type PositionColor = 'teal' | 'green' | 'yellow'

const positionColorMap: Record<1 | 2 | 3, PositionColor> = {
  1: 'teal',
  2: 'green',
  3: 'yellow',
}

interface PodiumCardProps {
  compact?: boolean
  entry: LeaguePodiumEntry
  position: 1 | 2 | 3
  squareBottom?: boolean
}

export default function PodiumCard({
  compact = false,
  entry,
  position,
  squareBottom = false,
}: PodiumCardProps) {
  const barsItems = entry.breakdown ? getBreakdownEntries(entry.breakdown) : []
  const color = positionColorMap[position]
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className={`${styles.container} ${compact ? styles.compact : ''}`}>
        <div className={`${styles.positionContainer} ${styles[color]}`}>
          {position}
        </div>

        <div
          className={`${styles.card} ${squareBottom ? styles.squareBottom : ''}`}
        >
          {position === 1 && <Crown height={48} width={48} />}
          <div className={styles.cardContent}>
            <Image
              circular
              colored
              alt={entry.player.name}
              colorName={color}
              fallbackSrc="/potm.png"
              src={
                entry.selectedData?.selectedSkin
                  ? skinToImagePath(entry.selectedData.selectedSkin)
                  : '/potm.png'
              }
            />
            <p className={styles.name}>{entry.player.name}</p>
            <p className={styles.score}>{entry.leagueScore} pts</p>
          </div>
          {entry.breakdown && (
            <Button
              small
              colorName="secondary"
              variant="ghost"
              onClick={() => setIsModalOpen(true)}
            >
              <span className={styles.labelDesktop}>View breakdown</span>
              <span className={styles.labelMobile}>More</span>
            </Button>
          )}
        </div>
      </div>
      {entry.breakdown && (
        <Modal
          isOpen={isModalOpen}
          title="Season stats breakdown"
          onClose={() => setIsModalOpen(false)}
        >
          <Bars items={barsItems} />
        </Modal>
      )}
    </>
  )
}
