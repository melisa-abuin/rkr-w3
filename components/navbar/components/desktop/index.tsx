'use client'

import { usePathname } from 'next/navigation'
import { NavLinks, NavLink } from './styled'
import Link from 'next/link'
import { downloadFileName, routes } from '@/constants'

export default function DesktopNavbar() {
  const pathname = usePathname()
  const basePath = pathname?.split('/').slice(0, 2).join('/')

  return (
    <NavLinks>
      {Object.values(routes).map((route) => (
        <NavLink key={route.label} selected={basePath === route.pathname}>
          <Link
            href={route.url}
            target={route.target}
            rel={route.target === '_blank' ? 'noopener noreferrer' : undefined}
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
  )
}
