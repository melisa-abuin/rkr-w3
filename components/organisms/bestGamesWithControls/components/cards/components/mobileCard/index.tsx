import { formatDateToLocale, formatSecondsAsTime } from '@/utils'
import styles from './index.module.css'
import PositionNumber from '@/components/atoms/positionNumber'
import Tooltip from '@/components/atoms/tooltip'
import Paws from '@/components/atoms/paws'
import { usePreferredTheme } from '@/hooks/usePreferredTheme'

interface CardProps {
  date: string
  difficulty: string
  position: number
  time: number
  teamMembers: string
  showDifficulty: boolean
}

export default function MobileCard({
  date,
  difficulty,
  position,
  time,
  teamMembers,
  showDifficulty,
}: CardProps) {
  const members = teamMembers.replace(/#\d+/g, '')
  const matchDate = formatDateToLocale(date)
  const [theme] = usePreferredTheme()

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <PositionNumber isSmall pos={position} />
        <div className={styles.wrapper}>
          <Tooltip
            ariaLabel="Difficulty"
            body={`${formatSecondsAsTime(time, true)}${showDifficulty ? ` - ${difficulty}` : ''}`}
          >
            <div className={styles.row}>
              <h4 className={styles.title}>{formatSecondsAsTime(time)}</h4>
              {showDifficulty && (
                <Paws
                  color={theme.text.color.secondary}
                  difficulty={difficulty}
                />
              )}
            </div>
          </Tooltip>

          <span className={styles.description}>{matchDate}</span>
        </div>
      </div>
      <div className={styles.nameList}>{members}</div>
    </div>
  )
}
