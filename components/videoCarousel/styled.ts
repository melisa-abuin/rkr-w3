import styled from 'styled-components'

interface ButtonProps {
  active?: boolean
}

export const Button = styled.button<ButtonProps>`
  background: none;
  border: 1px solid
    ${({ theme, active }) =>
      active ? theme.color.secondary : theme.text.primary};
  cursor: pointer;
  padding: 20px;
`

export const Container = styled.section`
  align-items: center;
  background-color: ${({ theme }) => theme.background.secondary};
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
  color: ${({ theme }) => theme.text.primary};
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
