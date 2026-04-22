import Link from '@/components/atoms/link'
import Image from '@/components/atoms/image'
import { BattleTag as BattleTagI, Skins } from '@/interfaces/player'
import styles from './index.module.css'

const formatSkinName = (skin: Skins) => {
  if (!skin.selectedSkin) return '/potm.png'
  return `/awards/${skin.selectedSkin[0].toLowerCase()}${skin.selectedSkin.slice(1)}.png`
}

interface Props {
  battleTag: BattleTagI
  skins?: Skins | null
}

export default function PlayerTag({ battleTag, skins = null }: Props) {
  return (
    <div className={styles.container}>
      {skins && (
        <div className={styles.imageContainer}>
          <Image
            colored
            alt={battleTag.tag}
            fallbackSrc={'/potm.png'}
            src={formatSkinName(skins)}
          />
        </div>
      )}
      <div className={styles.textContainer}>
        <Link
          color="brandSecondary"
          href={`/player/${encodeURIComponent(battleTag.tag)}`}
        >
          {battleTag.name}
        </Link>
        <p className={styles.subTitle}>{battleTag.tag}</p>
      </div>
    </div>
  )
}
