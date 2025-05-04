import styled from 'styled-components'

interface NavLinkProps {
  selected?: boolean
  hasTransparentStyle: boolean
}

export const NavLink = styled.li<NavLinkProps>`
  position: relative;
  margin: 0 2px;

  a {
    padding: 16px 16px;
    display: block;

    font-size: var(--font-size-xs-sm);
    font-weight: var(
      ${({ selected }) =>
        selected ? '--font-weight-bold' : '--font-weight-semi-bold'}
    );
    text-decoration: none;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: ${({ theme, hasTransparentStyle }) =>
      hasTransparentStyle ? theme.text.white : theme.text.color.primary};
    transform: scaleX(${({ selected }) => (selected ? 1 : 0)});
    transform-origin: center;
    transition: transform 0.3s ease;
  }

  &:hover::after {
    background-color: ${({ theme, hasTransparentStyle }) =>
      hasTransparentStyle ? theme.text.white : theme.text.hover.tertiary};
    transform: scaleX(1);
  }

  &:hover {
    a {
      color: ${({ theme, hasTransparentStyle }) =>
        hasTransparentStyle ? theme.text.white : theme.text.hover.tertiary};
    }
  }

  @media (max-width: 700px) {
    display: none;
  }
`

export const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
`
