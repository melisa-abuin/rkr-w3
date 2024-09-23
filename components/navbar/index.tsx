'use client'
import { usePathname } from 'next/navigation'
import { Container, StyledNav } from './styled'
import Image from 'next/image'
import { useIsScrollAtTop } from '@/hooks/useIsScrollAtTop'
import { useTheme } from '@/hooks/useTheme'
import DesktopNavbar from './desktop'
import MobileNavbar from './mobile'

export default function Navbar() {
  const pathname = usePathname()
  const [isAtTopPage] = useIsScrollAtTop()
  const [theme] = useTheme()
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
              : `/brand-icon-${theme.name}.png`
          }
          width={64}
        />
        <DesktopNavbar />
        <MobileNavbar />
      </Container>
    </StyledNav>
  )
}
