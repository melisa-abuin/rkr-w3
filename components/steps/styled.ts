import styled from 'styled-components'

export const ChevronContainer = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
export const Dots = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  justify-content: center;
`
export const Dot = styled.button<{ selected: boolean }>`
  border-radius: 50%;
  border: ${({ theme }) => `1px solid ${theme.color.primary}`};
  background-color: ${({ theme, selected }) =>
    selected ? theme.color.primary : 'transparent'};
  cursor: pointer;
  height: 16px;
  width: 16px;
`
export const StepContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
`
