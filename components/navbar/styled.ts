import styled from 'styled-components'

export const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  padding: 1rem;
  background-color: #f8f9fa; /* Example background */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

export const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  gap: 1.5rem;
`

export const NavLink = styled.li`
  a {
    text-decoration: none;
    color: #333;
    font-weight: 500;

    &:hover {
      color: #0070f3;
    }
  }
`
