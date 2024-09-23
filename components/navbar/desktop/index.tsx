'use client'
import { usePathname } from 'next/navigation'
import { NavLinks, NavLink } from './styled'
import Link from 'next/link'

export default function DesktopNavbar() {
  const pathname = usePathname()

  return (
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
  )
}
