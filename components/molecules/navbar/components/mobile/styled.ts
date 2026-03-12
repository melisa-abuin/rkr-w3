import styled from 'styled-components'

interface NavLinkProps {
  selected?: boolean
}

export const Container = styled.div`
  display: none;

  @media (max-width: 700px) {
    display: inline;
  }
`

export const NavLink = styled.li<NavLinkProps>`
  a {
    font-size: var(--font-size-xs-sm);
    font-weight: var(
      ${({ selected }) =>
        selected
          ? '--font-weight-semi-bold-hightlight'
          : '--font-weight-semi-bold'}
    );
    text-decoration: none;
  }
  padding: 16px 18px;
`

export const NavLinks = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  width: 100%;
`

export const MobileMenu = styled.div`
  align-items: flex-end;
  background: ${({ theme }) => theme.background.primary};
  display: flex;
  flex-direction: column;
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
`

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text.white};
  cursor: pointer;
  padding: 20px;

  & span {
    font-size: var(--font-size-xl);
  }
`
