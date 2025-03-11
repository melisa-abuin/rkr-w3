import styled from 'styled-components'

export const Container = styled.section`
  align-items: center;
  background-color: ${({ theme }) => theme.background.primary};
  color: ${({ theme }) => theme.text.primary};
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  padding: 2rem;
  padding-top: 100px;
`
