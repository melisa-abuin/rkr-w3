'use client'
import { usePathname } from 'next/navigation'
import { CloseButton, Container, MobileMenu, NavLinks, NavLink } from './styled'
import Image from 'next/image'
import { useIsScrollAtTop } from '@/hooks/useIsScrollAtTop'
import { useTheme } from '@/hooks/useTheme'
import { useState } from 'react'
import { downloadFileName, routes } from '@/constants'
import Link from '@/components/atoms/link'

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
          {Object.values(routes).map((route) => (
            <NavLink key={route.label} selected={pathname === route.pathname}>
              <Link
                href={route.url}
                target={route.target}
                onClick={() => setIsMenuOpen(false)}
              >
                {route.label}
              </Link>
            </NavLink>
          ))}
          <NavLink>
            <Link href={`/${downloadFileName}.w3x`} download={downloadFileName}>
              Download v1.0.8
            </Link>
          </NavLink>
        </NavLinks>
      </MobileMenu>
    </Container>
  )
}
