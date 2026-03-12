import styled from 'styled-components'

export const Container = styled.div`
  background-color: ${({ theme }) => theme.background.tertiary};
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  top: 90px;
  width: 100%;
  position: fixed;
  z-index: 2;
`
export const Content = styled.div`
  color: ${({ theme }) => theme.text.primary};
  font-size: var(--font-size-xs-sm);
  flex: 1;
  text-align: center;
`
export const CrossContainer = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`
export const Spacer = styled.div`
  height: 72px;
`
