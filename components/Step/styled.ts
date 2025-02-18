import styled from 'styled-components'

export const Container = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.text.primary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-regular);
  padding-bottom: 32px;
  text-align: justify;
  max-width: 640px;
  width: 100%;

  & img {
    box-shadow: 0px 4px 6px ${({ theme }) => theme.shadow.primary};
    border-radius: 5px;
  }

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
