import styled from 'styled-components'

export const Container = styled.div`
  align-items: center;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.color.primary};
  box-shadow: ${({ theme }) => theme.shadow.primary};
  color: ${({ theme }) => theme.text.white};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
`

export const Message = styled.p`
  padding-right: 5px;
`

export const Wrapper = styled.div`
  align-items: center;
  bottom: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 16px;
  position: fixed;
  z-index: 2;
`
