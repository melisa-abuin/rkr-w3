import styled from 'styled-components'

export const Col = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
`

export const Container = styled.div`
  background-color: ${({ theme }) => theme.background.quaternary};
  color: ${({ theme }) => theme.text.primary};
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 24px 16px;
  width: 100%;
  gap: 20px;
  flex-wrap: wrap;
`

export const ValueText = styled.span`
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
`

export const LabelText = styled.span`
  font-size: var(--font-size-xs-sm);
  font-weight: var(--font-weight-regular);
`
