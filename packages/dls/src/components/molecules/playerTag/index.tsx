import Image from '@/components/atoms/image'
import Link from '@/components/atoms/link'
import NameTag from '@/components/atoms/nameTag'
import { BattleTag as BattleTagI, Skins } from '@/interfaces/player'
import styles from './index.module.css'

const formatSkinName = (skin: Skins) => {
  if (!skin.selectedSkin) return '/potm.png'
  return `/awards/${skin.selectedSkin[0].toLowerCase()}${skin.selectedSkin.slice(1)}.png`
}

interface PlayerTagProps {
  battleTag: BattleTagI
  skins?: Skins | null
}

export default function PlayerTag({ battleTag, skins = null }: PlayerTagProps) {
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
      <NameTag subtitle={battleTag.tag} textAlign="left">
        <Link
          color="brandSecondary"
          href={`/player/${encodeURIComponent(battleTag.tag)}`}
        >
          {battleTag.name}
        </Link>
      </NameTag>
    </div>
  )
}
