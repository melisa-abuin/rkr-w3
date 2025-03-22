'use client'

import Info from '@/components/atoms/info'
import Link from '@/components/atoms/link'

export default function HelpInfo() {
  return (
    <Info as="ul">
      <li>
        <strong>Can&apos;t find your stats?</strong>{' '}
        <Link colorName="tertiary" href="/guide" aria-label="Go to guide">
          Click here
        </Link>{' '}
        to learn how to upload your game progress and get featured on the
        leaderboard!
      </li>
      <li>
        Don&apos;t want your BattleTag displayed on this page? Join our{' '}
        <Link
          colorName="tertiary"
          href="https://discord.com/channels/873715731873804298/1344673409468207186"
          aria-label="Discord server"
          target="_blank"
          rel="noopener noreferrer"
        >
          Discord server
        </Link>{' '}
        and contact a member with the &quot;Developer&quot; tag to request it to
        be anonymized.
      </li>
    </Info>
  )
}
