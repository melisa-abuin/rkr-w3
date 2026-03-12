'use client'

import Info from '@/components/atoms/info'
import Link from '@/components/atoms/link'

export default function HelpInfo() {
  return (
    <Info as="ul">
      <li>
        <strong>Can&apos;t find your stats?</strong>{' '}
        <Link aria-label="Go to guide" color="tertiary" href="/guide">
          Click here
        </Link>{' '}
        to learn how to upload your game progress and get featured on the
        leaderboard!
      </li>
      <li>
        Don&apos;t want your BattleTag displayed on this page? Join our{' '}
        <Link
          aria-label="Discord server"
          color="tertiary"
          href="https://discord.com/channels/873715731873804298/1344673409468207186"
          rel="noopener noreferrer"
          target="_blank"
        >
          Discord server
        </Link>{' '}
        and contact a member with the &quot;Developer&quot; tag to request it to
        be anonymized.
      </li>
    </Info>
  )
}
