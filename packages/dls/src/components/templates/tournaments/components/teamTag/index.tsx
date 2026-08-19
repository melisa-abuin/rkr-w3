import { TournamentTeamMember } from '@/interfaces/tournament'
import styles from './index.module.css'

const MAX_VISIBLE = 3

const formatMembers = (members: TournamentTeamMember[]): string => {
  const visible = members.slice(0, MAX_VISIBLE).map((m) => m.battleTag.name)
  const rest = members.length - MAX_VISIBLE
  return rest > 0
    ? `${visible.join(', ')} and ${rest} more`
    : visible.join(', ')
}

interface TeamTagProps {
  name: string
  members: TournamentTeamMember[]
}

export default function TeamTag({ name, members }: TeamTagProps) {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <p className={styles.title}>{name}</p>
        <p className={styles.subTitle}>{formatMembers(members)}</p>
      </div>
    </div>
  )
}
