'use client'

import { usePathname } from 'next/navigation'
import { NavLinks, NavLink } from './styled'
import { downloadFileName, routes } from '@/constants'
import Link from '@/components/atoms/link'

export default function DesktopNavbar() {
  const pathname = usePathname()
  const basePath = pathname?.split('/').slice(0, 2).join('/')

  return (
    <NavLinks>
      {Object.values(routes).map((route) => (
        <NavLink key={route.label} selected={basePath === route.pathname}>
          <Link href={route.url} target={route.target}>
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
