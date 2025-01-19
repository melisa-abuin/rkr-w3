import styled from 'styled-components'

export const Header = styled.div`
  background-color: ${({ theme }) => theme.background.quaternary};
  color: ${({ theme }) => theme.text.tertiary};
  padding-top: 16px;
  font-weight: var(--font-weight-bold);
  text-align: center;
`
export const Body = styled.div`
  background-color: ${({ theme }) => theme.background.quaternary};
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
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
