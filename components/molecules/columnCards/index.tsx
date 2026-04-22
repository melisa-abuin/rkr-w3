'use client'

import styles from './index.module.css'
import LoaderCard from './components/loaderCard'
import { LeaderboardCategories } from '@/interfaces/leaderboard'
import Row from './components/row'
import Link from '@/components/atoms/link'
import { isRoundDifficultyAvailable } from '@/utils/isRoundDifficultyAvailable'
import { Difficulty } from '@/interfaces/difficulty'

interface Props {
  data?: LeaderboardCategories[]
  difficulty?: Difficulty | undefined
  hoverable?: boolean
  loading?: boolean
  filter: 'stats' | 'times'
  selectedPlayer?: string
}

export default function ColumnCards({
  data = [],
  difficulty = undefined,
  hoverable = false,
  loading,
  filter,
  selectedPlayer,
}: Props) {
  const getViewAllHref = (key: string) => {
    const difficultyUrlParam = difficulty ? `&difficulty=${difficulty}` : ''
    return `/stats?filter=${filter}&page=1&sortKey=${key}&sortOrder=desc${difficultyUrlParam}`
  }

  if (loading && data.length === 0) {
    return <LoaderCard />
  }

  return (
    <div className={styles.container}>
      {data
        ?.filter(({ key }) => isRoundDifficultyAvailable(key, difficulty))
        .map(({ category, data, key }) => (
          <div key={key} className={styles.card}>
            <div className={styles.header}>{category}</div>
            <table className={styles.table}>
              <tbody>
                {data?.map(({ player, data }, index) => (
                  <Row
                    key={index}
                    data={data}
                    hoverable={hoverable}
                    isSelected={selectedPlayer === player.tag}
                    player={player}
                  />
                ))}
                {data.length < 5 &&
                  [...Array(5 - data.length)].map((_, index) => (
                    <Row key={index} hoverable={hoverable} />
                  ))}
              </tbody>
            </table>
            <div className={styles.footer}>
              <Link color="secondary" href={getViewAllHref(key)}>
                View all
              </Link>
            </div>
          </div>
        ))}
    </div>
  )
}
