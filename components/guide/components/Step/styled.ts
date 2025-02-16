import styled from 'styled-components'

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-regular);
  padding-bottom: 32px;
  text-align: justify;
  max-width: 640px;
  width: 100%;

  @media (max-width: 640px) {
    & img {
      height: auto;
      width: 100%;
    }
  }
`
export const StepCounter = styled.strong`
  width: 100%;
`
