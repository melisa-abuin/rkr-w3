import styled from 'styled-components'

export const Body = styled.div`
  background-color: ${({ theme }) => theme.background.quaternary};
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-around;
  padding: 16px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`

export const Conatiner = styled.div`
  width: 100%;
`

export const ErrorText = styled.p`
  color: ${({ theme }) => theme.text.primary};
  font-size: var(--font-size-xs-sm);
  text-align: center;
`

export const Line = styled.div`
  border: none;
  border-top: 1px solid #ccc;
  height: 0;
  width: 100%;
`

export const SectionContainer = styled.div`
  width: 30%;

  @media (max-width: 480px) {
    width: 100%;
  }
`

export const Section = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-start;
`

export const Title = styled.h3`
  align-items: center;
  color: ${({ theme }) => theme.text.secondary};
  display: flex;
  flex-direction: row;
  font-size: var(--font-size-xs-sm);
  font-weight: var(--font-weight-semi-bold);
  gap: 15px;
`

export const Description = styled.p`
  font-size: var(--font-size-xs);
  color: ${({ theme }) => theme.text.secondary};
`

export const TooltipTitle = styled.h3`
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semi-bold);
  color: ${({ theme }) => theme.text.primary};
  margin: 0 0 8px 0;
`

export const TooltipContainer = styled.div`
  width: 200px;
`
