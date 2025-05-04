'use client'
import { usePathname } from 'next/navigation'
import { Container, StyledNav } from './styled'
import Image from 'next/image'
import { useIsScrollAtTop } from '@/hooks/useIsScrollAtTop'
import DesktopNavbar from './components/desktop'
import MobileNavbar from './components/mobile'
import Link from '@/components/atoms/link'

export default function Navbar() {
  const pathname = usePathname()
  const [isAtTopPage] = useIsScrollAtTop()
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
                : `/rkr-icon-primary.png`
            }
            width={54}
          />
        </Link>
        <DesktopNavbar hasTransparentStyle={shouldShowTransparentNav} />
        <MobileNavbar />
      </Container>
    </StyledNav>
  )
}
