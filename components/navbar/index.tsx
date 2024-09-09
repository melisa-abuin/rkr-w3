'use client'
import { usePathname } from 'next/navigation'
import { Container, NavLinks, NavLink, StyledNav } from './styled'
import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  const pathname = usePathname()

  return (
    <StyledNav>
      <Container>
        <Image
          alt="brand logo"
          height={54}
          src="/brand-icon-primary.png"
          width={54}
        />
        <NavLinks>
          <NavLink selected={pathname === '/'}>
            <Link href="/">Home</Link>
          </NavLink>
          <NavLink selected={pathname === '/how-to-play'}>
            <Link href="/how-to-play">How To Play</Link>
          </NavLink>
          <NavLink selected={pathname === '/challenges'}>
            <Link href="/challenges">Challenges</Link>
          </NavLink>
          <NavLink selected={pathname === '/leaderboard'}>
            <Link href="/leaderboard">Leaderboard</Link>
          </NavLink>
        </NavLinks>
      </Container>
    </StyledNav>
  )
}
