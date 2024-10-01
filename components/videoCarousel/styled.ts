import styled from 'styled-components'

export const Button = styled.button`
  background: none;
  border: 1px solid black;
  cursor: pointer;
  padding: 20px;
`

export const Container = styled.section`
  align-items: center;
  background-color: ${({ theme }) => theme.background.primary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
`

export const IconsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: center;
  padding-top: 1rem;
`

export const Info = styled.p`
  color: ${({ theme }) => theme.text.secondary};
  font-size: var(--font-size-body-large);
  margin-bottom: 4rem;

  max-width: 600px;
  text-align: center;
  width: 100%;
`

export const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.text.primary};
  margin-bottom: 3rem;
`
