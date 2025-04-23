import styled from 'styled-components'

export const Container = styled.div`
  background-color: ${({ theme }) => theme.background.quaternary};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 16px;
  text-align: center;
  flex: 1;
  min-width: 180px;
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
  background-color: ${({ theme }) => theme.background.highlightPrimary};
  color: ${({ theme }) => theme.text.primary};
  flex: 1;
  padding: 10px;
  align-content: center;
  font-size: var(--font-size-xs);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Title = styled.h4`
  color: ${({ theme }) => theme.text.tertiary};
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-sm);
  margin: 0;
`
export const Description = styled.span`
  color: ${({ theme }) => theme.text.secondary};
  font-weight: var(--font-weight-regular);
  font-size: var(--font-size-xs);
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: left;
`
