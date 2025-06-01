import styled from 'styled-components'

export const Body = styled.div<{ isCollapsed: boolean }>`
  border-radius: 3px;
  color: ${({ theme }) => theme.color.primary};
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-height: ${({ isCollapsed }) => (isCollapsed ? '0' : '800px')};
  opacity: ${({ isCollapsed }) => (isCollapsed ? 0 : 1)};
  overflow: hidden;
  padding-top: ${({ isCollapsed }) => (isCollapsed ? '0' : '8px')};
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
  align-items: center;
  background-color: ${({ theme }) => theme.background.quaternary};
  border-radius: 3px;
  color: ${({ theme }) => theme.text.color.primary};
  cursor: pointer;
  display: flex;
  flex-direction: row;
  font-size: var(--font-size-xs-sm);
  font-weight: var(--font-weight-regular);
  justify-content: space-between;
  padding: 16px 24px;
  text-transform: capitalize;
`

export const Title = styled.h2`
  color: ${({ theme }) => theme.text.primary};
  font-size: var(--font-size-sm-md);
  font-weight: var(--font-weight-bold);
  text-transform: capitalize;
  margin: 0;
`
