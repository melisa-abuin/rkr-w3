import styled from 'styled-components'

export const Wrapper = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.background.quaternary};
  height: 32px;
  border-radius: 8px;
  padding: 0 8px;
  gap: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`
