import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
`

export const Header = styled.div`
  display: flex;
`

export const Button = styled.button<{ active: boolean }>`
  padding: 10px 16px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: var(--font-size-sm);
  font-weight: ${({ active }) =>
    active ? 'var(--font-weight-bold)' : 'var(--font-weight-semi-bold)'};
  color: ${({ theme, active }) =>
    active ? theme.text.primary : theme.text.secondary};
  border-bottom: 2px solid
    ${({ theme, active }) => (active ? theme.color.primary : 'transparent')};
  transition: all 0.2s;

  &:hover {
    color: ${({ theme }) => theme.text.primary};
  }
`

export const Content = styled.div`
  padding: 16px 0;
`
