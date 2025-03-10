import styled from 'styled-components'

export const Wrapper = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.background.quaternary};
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.background.highlightTertiary};
  display: flex;
  flex-direction: row;
  gap: 4px;
  justify-content: space-between;
  padding: 8px;
  width: 100%;

  &:focus {
    outline: 1px solid ${({ theme }) => theme.color.primary};
  }
`

export const StyledInput = styled.input`
  background-color: ${({ theme }) => theme.background.quaternary};
  color: ${({ theme }) => theme.text.primary};
  border: none;
  flex: 1;
  &:focus {
    outline: none;
  }
`

export const ClearIconContainer = styled.button`
  align-items: center;
  background: inherit;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
`
