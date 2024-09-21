'use client'

import { blizzardLink, githubReadMeLink } from '@/constants'
import { FooterContainer, Link } from './styled'

export default function Footer() {
  return (
    <FooterContainer>
      <p>This is a non-profit project developed and maintained by Aches</p>
      <p>
        Warcraft is ©2024 by{' '}
        <Link href={blizzardLink}>Blizzard Entertainment</Link>
      </p>
      <p>
        This website is an open-source project created by Melisa, learn{' '}
        <Link href={githubReadMeLink}> how to contribute</Link>
      </p>
    </FooterContainer>
  )
}
