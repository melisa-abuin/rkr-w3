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
            priority
            src={
              shouldShowTransparentNav
                ? '/rkr-icon-white.png'
                : `/rkr-icon-${theme.name}.png`
            }
            width={54}
          />
        </Link>
        <DesktopNavbar />
        <MobileNavbar />
      </Container>
    </StyledNav>
  )
}
