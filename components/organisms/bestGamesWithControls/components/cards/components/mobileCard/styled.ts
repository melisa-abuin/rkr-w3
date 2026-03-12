import styled from 'styled-components'

export const Container = styled.div`
  background-color: ${({ theme }) => theme.background.quaternary};
  border-radius: 5px;
  display: none;
  flex-direction: column;
  flex: 1;
  min-width: 180px;
  overflow: hidden;
  padding: 16px;
  text-align: center;
  width: 100%;

  @media (max-width: 480px) {
    display: flex;
  }
`

export const Description = styled.span`
  color: ${({ theme }) => theme.text.secondary};
  font-weight: var(--font-weight-regular);
  font-size: var(--font-size-xs);
`

export const Header = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 24px;
  justify-content: flex-start;
  padding-bottom: 16px;
`

export const NameList = styled.div`
  align-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background.highlightPrimary};
  border-radius: 3px;
  color: ${({ theme }) => theme.text.primary};
  display: flex;
  flex: 1;
  font-size: var(--font-size-xs);
  justify-content: center;
  padding: 10px;
  text-align: center;
`

export const Row = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 8px;
`

export const Title = styled.h4`
  color: ${({ theme }) => theme.text.tertiary};
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-sm);
  margin: 0;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: left;
`
