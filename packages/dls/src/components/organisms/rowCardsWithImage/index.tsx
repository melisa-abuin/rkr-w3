import Loader from '@/components/atoms/loader'
import ValueWithDescription from '@/components/atoms/valueWithDescription'
import PlayerTag from '@/components/molecules/playerTag'
import RowCard from '@/components/molecules/rowCard'
import rowCardStyles from '@/components/molecules/rowCard/index.module.css'
import { BattleTag, Skins } from '@/interfaces/player'
import styles from './index.module.css'

type ValueKey<T> = {
  [Key in keyof T]: T[Key] extends number | string ? Key : never
}[keyof T]

interface RowCardColumn<T> {
  hideOnMobile?: boolean
  key: ValueKey<T>
  title: string
}

interface RowCardsWithImageProps<
  T extends { battleTag: BattleTag; skins?: Skins | null },
> {
  columns: readonly RowCardColumn<T>[]
  data?: T[]
  loading: boolean
  loadingRows?: number
}

export default function RowCardsWithImage<
  T extends { battleTag: BattleTag; skins?: Skins | null },
>({ columns, data = [], loading, loadingRows = 5 }: RowCardsWithImageProps<T>) {
  if (loading) {
    return (
      <div className={rowCardStyles.container}>
        {[...Array(loadingRows)].map((_, rowIndex) => (
          <RowCard key={rowIndex} position={rowIndex + 1}>
            <div className={styles.loadingColumn}>
              <Loader height={30} variant="secondary" width={'60%'} />
              <Loader height={20} variant="secondary" width={'60%'} />
            </div>
            <div className={rowCardStyles.columnsContainer}>
              {columns.map(({ key }) => (
                <div key={String(key)} className={styles.loadingColumn}>
                  <Loader height={30} variant="secondary" width={'80%'} />
                  <Loader height={20} variant="secondary" width={'80%'} />
                </div>
              ))}
            </div>
          </RowCard>
        ))}
      </div>
    )
  }

  return (
    <div className={rowCardStyles.container}>
      {data.map((item, index) => (
        <RowCard
          key={item.battleTag.tag}
          ariaLabel={`Player card for ${item.battleTag.tag}`}
          position={index + 1}
        >
          <PlayerTag battleTag={item.battleTag} skins={item.skins} />
          <div className={rowCardStyles.columnsContainer}>
            {columns.map(({ hideOnMobile, key, title }) => (
              <ValueWithDescription
                key={String(key)}
                description={title}
                hideOnMobile={hideOnMobile}
                value={item[key] as number | string}
              />
            ))}
          </div>
        </RowCard>
      ))}
    </div>
  )
}
