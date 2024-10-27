import styled from 'styled-components'
import Link from 'next/link'

export const Button = styled(Link)`
  background-color: ${({ theme }) => theme.color.primary};
  color: ${({ theme }) => theme.text.white};
  border: none;
  border-radius: 3px;
  cursor: pointer;
  padding: 12px 18px;
  text-decoration: none;
`

export const Container = styled.section`
  align-items: center;
  background-color: ${({ theme }) => theme.background.primary};
  color: ${({ theme }) => theme.text.primary};
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  padding: 2rem;
  padding-top: 100px;
`
