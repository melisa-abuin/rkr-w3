'use client'
import { usePathname } from 'next/navigation'
import { CloseButton, Container, MobileMenu, NavLinks, NavLink } from './styled'
import Image from 'next/image'
import Link from 'next/link'
import { useIsScrollAtTop } from '@/hooks/useIsScrollAtTop'
import { useTheme } from '@/hooks/useTheme'
import { useState } from 'react'

export default function MobileNavbar() {
  const pathname = usePathname()
  const [isAtTopPage] = useIsScrollAtTop()
  const [theme] = useTheme()
  const shouldShowTransparentNav = isAtTopPage && pathname === '/'
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  if (!isMenuOpen) {
    return (
      <Container>
        <Image
          alt="hamburger menu"
          height={25}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          src={
            shouldShowTransparentNav || theme.name === 'dark'
              ? '/hamburger-white.png'
              : '/hamburger-black.png'
          }
          width={25}
        />
      </Container>
    )
  }

  return (
    <Container>
      <MobileMenu>
        <CloseButton
          type="button"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close modal"
        >
          <span aria-hidden="true">&times;</span>
        </CloseButton>
        <NavLinks>
          <NavLink selected={pathname === '/'}>
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
          </NavLink>
          <NavLink selected={pathname === '/how-to-play'}>
            <Link href="#" onClick={() => setIsMenuOpen(false)}>
              How To Play
            </Link>
          </NavLink>
          <NavLink selected={pathname === '/challenges'}>
            <Link href="#" onClick={() => setIsMenuOpen(false)}>
              Challenges
            </Link>
          </NavLink>
          <NavLink selected={pathname === '/leaderboard'}>
            <Link href="#" onClick={() => setIsMenuOpen(false)}>
              Leaderboard
            </Link>
          </NavLink>
        </NavLinks>
      </MobileMenu>
    </Container>
  )
}
