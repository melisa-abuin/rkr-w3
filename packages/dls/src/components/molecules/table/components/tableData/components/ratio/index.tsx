import styles from './index.module.css'

interface RatioProps {
  data: number
}

export default function Ratio({ data }: RatioProps) {
  return (
    <div
      className={`${styles.container} ${data > 1 ? styles.containerHighlighted : ''}`}
    >
      {data}
    </div>
  )
}
