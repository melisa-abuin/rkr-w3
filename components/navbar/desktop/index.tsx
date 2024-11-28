'use client'
import { usePathname } from 'next/navigation'
import { NavLinks, NavLink } from './styled'
import Link from 'next/link'
import { routes } from '@/constants'

export default function DesktopNavbar() {
  const pathname = usePathname()

  return (
    <NavLinks>
      {Object.values(routes).map((route) => (
        <NavLink key={route.label} selected={pathname === route.url}>
          <Link
            href={route.url}
            target={route.target}
            rel={route.target === '_blank' ? 'noopener noreferrer' : undefined}
          >
            {route.label}
          </Link>
        </NavLink>
      ))}
    </NavLinks>
  )
}
