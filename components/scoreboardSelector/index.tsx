'use client'

import { useTheme } from '@/hooks/useTheme'
import { Clock } from '../icons/clock'
import { Stats } from '../icons/stats'
import { PageContainer } from '../pageContainer'
import Toggle from '../toggle'
import { useRouter } from 'next/navigation'

export default function ScoreboardSelector({
  toggleInitialValue,
}: {
  toggleInitialValue: boolean
}) {
  const [theme] = useTheme()
  const router = useRouter()

  const onToggle = (newToggleValue: boolean) => {
    if (newToggleValue) {
      router.push('/stats/time?page=1&sortKey=roundOne&sortOrder=asc')
    } else {
      router.push(
        '/stats/overview?page=1&sortKey=completedChallenges&sortOrder=desc',
      )
    }
  }

  return (
    <PageContainer>
      <Toggle
        initialValue={toggleInitialValue}
        onToggle={onToggle}
        iconOff={<Clock fill={theme.color.secondary} height={20} width={20} />}
        iconOn={<Stats fill={theme.color.primary} height={20} width={20} />}
        textOff="Time stats"
        textOn="Overall stats"
      />
    </PageContainer>
  )
}
