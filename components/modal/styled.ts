import styled from 'styled-components'

export const Body = styled.div`
  padding: 8px 24px 24px 24px;
`

export const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
`

export const Container = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 100;
`

export const Content = styled.div`
  background-color: ${({ theme }) => theme.background.primary};
  border: 1px solid ${({ theme }) => theme.color.tertiary};
  border-radius: 8px;
`

export const Header = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 24px;
`

export const Title = styled.h2`
  color: ${({ theme }) => theme.text.primary};
  width: 100%;
`
