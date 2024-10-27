'use client'
import { usePathname } from 'next/navigation'
import { Container, StyledNav } from './styled'
import Image from 'next/image'
import { useIsScrollAtTop } from '@/hooks/useIsScrollAtTop'
import { useTheme } from '@/hooks/useTheme'
import DesktopNavbar from './desktop'
import MobileNavbar from './mobile'
import Link from 'next/link'

export default function Navbar() {
  const pathname = usePathname()
  const [isAtTopPage] = useIsScrollAtTop()
  const [theme] = useTheme()
  const shouldShowTransparentNav = isAtTopPage && pathname === '/'

  return (
    <StyledNav hasTransparentStyle={shouldShowTransparentNav}>
      <Container>
        <Link href="/">
          <Image
            alt="brand logo"
            height={54}
            src={
              shouldShowTransparentNav
                ? '/brand-icon-white.png'
                : `/brand-icon-${theme.name}.png`
            }
            width={64}
          />
        </Link>
        <DesktopNavbar />
        <MobileNavbar />
      </Container>
    </StyledNav>
  )
}
