'use client'

import { blizzardLink, githubReadMeLink } from '@/constants'
import { FooterContainer } from './styled'
import Link from '@/components/atoms/link'

export default function Footer() {
  return (
    <FooterContainer>
      <p>This is a non-profit project developed and maintained by Aches</p>
      <p>
        Warcraft is ©2025 by{' '}
        <Link
          color="brandSecondary"
          href={blizzardLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Blizzard Entertainment
        </Link>
      </p>
      <p>
        This website is an open-source project created by Melisa, learn{' '}
        <Link
          color="brandSecondary"
          href={githubReadMeLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          how to contribute
        </Link>
      </p>
      <p>
        Uicons by{' '}
        <Link
          color="brandSecondary"
          href="https://www.flaticon.com/uicons"
          target="_blank"
          rel="noopener noreferrer"
        >
          Flaticon
        </Link>
      </p>
    </FooterContainer>
  )
}
