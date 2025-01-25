import styled from 'styled-components'

export const Conatiner = styled.div`
  background-color: ${({ theme }) => theme.background.quaternary};
  width: 100%;
`

export const Header = styled.h2`
  color: ${({ theme }) => theme.text.tertiary};
  padding-top: 16px;
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
  text-align: center;
`
export const Body = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
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
`

export const Section = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-start;
`

export const Title = styled.p`
  align-items: center;
  color: ${({ theme }) => theme.text.secondary};
  display: flex;
  flex-direction: row;
  gap: 15px;
`
