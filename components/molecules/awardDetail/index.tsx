import Image from '@/components/atoms/image'
import { getMatchedThreshold } from '@/utils'
import styles from './index.module.css'

interface Props {
  title: string
  description: string
  imagePath: string
  percentage: number
}

export default function AwardDetail({
  title,
  description,
  imagePath,
  percentage,
}: Props) {
  const colorByPercentage: Record<number, string> = {
    5: styles.percentageValueTeal,
    10: styles.percentageValueGreen,
    25: styles.percentageValueYellow,
  }

  const matchedPercentageColor = getMatchedThreshold(
    percentage,
    colorByPercentage,
  )

  const percentageColorClass =
    matchedPercentageColor ?? styles.percentageValuePrimary

  const percentageClassName = `${styles.percentageValue} ${percentageColorClass}`

  return (
    <div className={styles.container}>
      <Image
        colored
        alt={title}
        fallbackSrc="/awards/fallback.png"
        src={imagePath}
      />
      <div className={styles.textContainer}>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.percentageContainer}>
        <p className={percentageClassName}>{percentage}%</p>
        <p className={styles.percentageLabel}>players have it</p>
      </div>
    </div>
  )
}
