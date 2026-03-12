import styled from 'styled-components'

export const Content = styled.div`
  align-items: flex-end;
  color: ${({ theme }) => theme.text.primary};
  display: flex;
  flex-direction: column;
  max-width: 800px;
  width: 100%;

  @media (max-width: 480px) {
    height: 100%;
    justify-content: space-between;
  }
`
export const Colored = styled.strong`
  font-weight: var(--font-weight-semi-bold);
  color: ${({ theme }) => theme.color.secondary};
`
export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  max-width: 300px;
  justify-content: flex-end;
  width: 100%;

  > button {
    width: 100%;
  }
  @media (max-width: 480px) {
    max-width: unset;
    width: 100%;
  }
`
