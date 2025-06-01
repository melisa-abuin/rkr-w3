import styled from 'styled-components'

export const Body = styled.div<{ isCollapsed: boolean }>`
  overflow: hidden;
  color: ${({ theme }) => theme.color.primary};
  border-radius: 3px;
  padding-top: ${({ isCollapsed }) => (isCollapsed ? '0' : '8px')};
  max-height: ${({ isCollapsed }) => (isCollapsed ? '0' : '500px')};
  opacity: ${({ isCollapsed }) => (isCollapsed ? 0 : 1)};
  transition:
    max-height 0.3s ease,
    opacity 0.2s ease,
    padding-top 0.2s ease;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const Header = styled.div`
  background-color: ${({ theme }) => theme.background.quaternary};
  border-radius: 3px;
  color: ${({ theme }) => theme.text.color.primary};
  cursor: pointer;
  font-size: var(--font-size-xs-sm);
  font-weight: var(--font-weight-regular);
  padding: 8px 16px;
  text-transform: capitalize;
`
