'use client'
import { useTheme } from '@/hooks/useTheme'
import { Brand } from '../icons/brand'
import { NavbarContainer, NavLinks, NavLink } from './styled'

export default function Navbar() {
  const [theme] = useTheme()
  return (
    <NavbarContainer>
      <Brand fill={theme.color.primary} height={54} width={54} />
      <NavLinks>
        <NavLink>
          <a href="#home">Home</a>
        </NavLink>
        <NavLink>
          <a href="#about">About</a>
        </NavLink>
        <NavLink>
          <a href="#contact">Contact</a>
        </NavLink>
      </NavLinks>
    </NavbarContainer>
  )
}
