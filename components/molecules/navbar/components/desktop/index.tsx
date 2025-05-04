'use client'

import { usePathname } from 'next/navigation'
import { NavLinks, NavLink } from './styled'
import { downloadFileName, routes } from '@/constants'
import Link from 'next/link'

export default function DesktopNavbar({
  hasTransparentStyle,
}: {
  hasTransparentStyle: boolean
}) {
  const pathname = usePathname()
  const basePath = pathname?.split('/').slice(0, 2).join('/')

  return (
    <NavLinks>
      {Object.values(routes).map((route) => (
        <NavLink
          hasTransparentStyle={hasTransparentStyle}
          key={route.label}
          selected={basePath === route.pathname}
        >
          <Link href={route.url} target={route.target}>
            {route.label}
          </Link>
        </NavLink>
      ))}
      <NavLink hasTransparentStyle={hasTransparentStyle}>
        <Link href={`/${downloadFileName}.w3x`} download={downloadFileName}>
          Download v1.2.1
        </Link>
      </NavLink>
    </NavLinks>
  )
}
