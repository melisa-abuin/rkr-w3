import React from 'react'
import styles from './index.module.css'

interface Props {
  data: number
}

export default function Ratio({ data }: Props) {
  return (
    <div
      className={`${styles.container} ${data > 1 ? styles.containerHighlighted : ''}`}
    >
      {data}
    </div>
  )
}
