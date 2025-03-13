'use client'

import { PageContainer } from '@/components/atoms/pageContainer'
import Toggle from '@/components/atoms/toggle'
import { Clock } from '@/components/icons/clock'
import { Stats } from '@/components/icons/stats'
import { useTheme } from '@/hooks/useTheme'
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
      router.push('/stats/time?page=1&sortKey=roundOne&sortOrder=desc')
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
