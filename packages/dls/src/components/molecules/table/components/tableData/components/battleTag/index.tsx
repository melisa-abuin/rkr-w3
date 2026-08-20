import Link from '@/components/atoms/link'
import NameTag from '@/components/atoms/nameTag'
import { BattleTag as BattleTagI } from '@/interfaces/player'

/*
 * using this in each of the children of the tdata I can make it generic
 */
interface k {
  data: unknown
}

interface BattleTagProps extends k {
  data: BattleTagI
}

export default function BattleTag({ data }: BattleTagProps) {
  const { name, tag } = data

  return (
    <NameTag subtitle={tag} textAlign="center">
      <Link color="brandSecondary" href={`/player/${encodeURIComponent(tag)}`}>
        {name}
      </Link>
    </NameTag>
  )
}
