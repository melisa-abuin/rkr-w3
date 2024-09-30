import styled from 'styled-components'

export const Title = styled.h1`
  font-size: var(--font-size-h1);
  margin-bottom: 1rem;
`

export const Info = styled.p`
  font-size: var(--font-size-body-large);
  margin-bottom: 2rem;

  @media (max-width: 480px) {
    display: none;
  }
`
