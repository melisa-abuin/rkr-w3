import styled from 'styled-components'

export const Row = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`
