import React from 'react'
import { BattleTag as BattleTagI } from '@/interfaces/player'
import Link from '@/components/atoms/link'
import styles from './index.module.css'

/*
 * using this in each of the children of the tdata I can make it generic
 */
interface k {
  data: unknown
}

interface Props extends k {
  data: BattleTagI
}

export default function BattleTag({ data }: Props) {
  const { name, tag } = data

  return (
    <div className={styles.container}>
      <Link color="brandSecondary" href={`/player/${encodeURIComponent(tag)}`}>
        {name}
      </Link>
      <p className={styles.subtitle}>{tag}</p>
    </div>
  )
}
