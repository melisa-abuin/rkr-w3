import styled from 'styled-components'

export const Container = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.background.quaternary};
  border-radius: 3px;
  color: ${({ theme }) => theme.text.primary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 200px;
  padding: 24px 16px;
`
