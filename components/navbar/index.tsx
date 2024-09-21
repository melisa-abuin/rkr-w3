'use client'
import { usePathname } from 'next/navigation'
import { Container, NavLinks, NavLink, StyledNav } from './styled'
import Image from 'next/image'
import Link from 'next/link'
import { useIsScrollAtTop } from '@/hooks/useIsScrollAtTop'

export default function Navbar() {
  const pathname = usePathname()
  const [isAtTopPage] = useIsScrollAtTop()

  const shouldShowTransparentNav = isAtTopPage && pathname === '/'

  return (
    <StyledNav hasTransparentStyle={shouldShowTransparentNav}>
      <Container>
        <Image
          alt="brand logo"
          height={54}
          src={
            shouldShowTransparentNav
              ? '/brand-icon-white.png'
              : '/brand-icon-primary.png'
          }
          width={54}
        />
        <NavLinks>
          <NavLink selected={pathname === '/'}>
            <Link href="/">Home</Link>
          </NavLink>
          <NavLink selected={pathname === '/how-to-play'}>
            <Link href="#">How To Play</Link>
          </NavLink>
          <NavLink selected={pathname === '/challenges'}>
            <Link href="#">Challenges</Link>
          </NavLink>
          <NavLink selected={pathname === '/leaderboard'}>
            <Link href="#">Leaderboard</Link>
          </NavLink>
        </NavLinks>
      </Container>
    </StyledNav>
  )
}
