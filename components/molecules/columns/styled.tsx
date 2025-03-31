import styled from 'styled-components'

export const Col = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 8px;
  justify-content: flex-start;
  text-align: center;
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
export const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-around;
  width: 100%;
`
export const Description = styled.span<{ highlight?: boolean }>`
  color: ${({ theme, highlight }) =>
    highlight ? theme.color.yellow : theme.text.primary};
  font-size: var(--font-size-xs-sm);
  font-weight: var(--font-weight-regular);
`

export const Title = styled.h3`
  align-items: center;
  color: ${({ theme }) => theme.text.secondary};
  display: flex;
  flex-direction: row;
  font-size: var(--font-size-xs-sm);
  font-weight: var(--font-weight-semi-bold);
  margin: 0;
  gap: 15px;
`
