import styled from 'styled-components'

export const Wrapper = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.background.quaternary};
  border: 1px solid ${({ theme }) => theme.background.highlightTertiary};
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  gap: 4px;
  justify-content: center;
  padding: 8px;

  &:focus {
    outline: 1px solid ${({ theme }) => theme.color.primary};
  }
`

export const StyledInput = styled.input`
  background-color: ${({ theme }) => theme.background.quaternary};
  border: none;
  &:focus {
    outline: none;
  }
`

export const ClearIconContainer = styled.button`
  border: none;
  background: inherit;
  cursor: pointer;
`
