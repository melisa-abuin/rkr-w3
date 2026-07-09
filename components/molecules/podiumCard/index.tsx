import Image from '@/components/atoms/image'
import { LeagueScoreboardEntry } from '@/interfaces/league'
import styles from './index.module.css'

type PositionColor = 'teal' | 'green' | 'yellow'

const positionColorMap: Record<1 | 2 | 3, PositionColor> = {
  1: 'teal',
  2: 'green',
  3: 'yellow',
}

interface Props {
  entry: LeagueScoreboardEntry
  position: 1 | 2 | 3
}

const skinToImagePath = (skin: string): string =>
  `/awards/${skin[0].toLowerCase()}${skin.slice(1)}.png`

export default function PodiumCard({ entry, position }: Props) {
  const color = positionColorMap[position]

  return (
    <div className={styles.container}>
      <div className={`${styles.positionContainer} ${styles[color]}`}>
        {position}
      </div>

      <div className={styles.card}>
        <Image
          circular
          colored
          alt={entry.player.name}
          colorName={color}
          fallbackSrc="/potm.png"
          height={64}
          src={
            entry.selectedData?.selectedSkin
              ? skinToImagePath(entry.selectedData.selectedSkin)
              : '/potm.png'
          }
          width={64}
        />
        <p className={styles.name}>{entry.player.name}</p>
        <p className={styles.tag}>{entry.player.tag}</p>
        <p className={styles.score}>{entry.leagueScore} pts</p>
      </div>
    </div>
  )
}
