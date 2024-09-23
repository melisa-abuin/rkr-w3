import styled from 'styled-components'

interface NavLinkProps {
  selected?: boolean
}

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

  @media (max-width: 480px) {
    display: none;
  }
`

export const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
`
