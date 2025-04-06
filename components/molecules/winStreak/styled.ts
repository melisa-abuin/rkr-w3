import styled from 'styled-components'

export const Container = styled.div`
  min-width: 200px;
  background-color: ${({ theme }) => theme.background.quaternary};
  color: ${({ theme }) => theme.text.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 24px 16px;
`
