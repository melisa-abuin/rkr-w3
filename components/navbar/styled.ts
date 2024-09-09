import styled from 'styled-components'

interface NavLinkProps {
  selected?: boolean
}

export const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  max-width: 1000px;
  width: 100%;
`

export const StyledNav = styled.nav`
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: 1rem;
  width: 100%;
`

export const NavLinks = styled.ul`
  display: flex;
  gap: 1.5rem;
  list-style: none;
  margin: 0;
`

export const NavLink = styled.li<NavLinkProps>`
  a {
    color: ${({ theme }) => theme.text.black};
    font-size: var(--font-size-navbar);
    font-weight: var(--font-weight-body-small);
    text-decoration: none;
  }
  padding: 16px 0;
  border-bottom: ${({ selected, theme }) =>
    selected ? `2px solid ${theme.text.black}` : 'none'};
`
