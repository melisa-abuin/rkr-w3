import styled, { css } from 'styled-components'

interface NavLinkProps {
  selected?: boolean
}
interface NavProps {
  hasTransparentStyle?: boolean
}

export const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  max-width: 1000px;
  width: 100%;
`

export const NavLink = styled.li<NavLinkProps>`
  a {
    font-size: var(--font-size-navbar);
    font-weight: var(
      ${({ selected }) =>
        selected ? '--font-weight-navbar-hightlight' : '--font-weight-navbar'}
    );
    text-decoration: none;
  }
  padding: 16px 18px;
  border-bottom: ${({ selected, theme }) =>
    selected ? `2px solid ${theme.text.primary}` : 'none'};
`

export const StyledNav = styled.nav<NavProps>`
  align-items: center;
  background: ${({ hasTransparentStyle, theme }) =>
    hasTransparentStyle ? 'transparent' : theme.background.primary};
  box-shadow: ${({ hasTransparentStyle }) =>
    hasTransparentStyle ? 'none' : '0 4px 6px rgba(0, 0, 0, 0.1)'};

  box-sizing: border-box;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: 1rem;
  position: fixed;
  top: 0;
  width: 100%;

  a {
    color: ${({ hasTransparentStyle, theme }) =>
      hasTransparentStyle ? theme.text.white : theme.text.primary};
  }

  ${NavLink} {
    ${({ hasTransparentStyle, theme }) =>
      hasTransparentStyle &&
      css`
        border-bottom-color: ${theme.text.white};
      `}
  }
`

export const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
`
