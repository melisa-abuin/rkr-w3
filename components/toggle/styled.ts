import styled from 'styled-components'

export const Container = styled.button<{ isToggled: boolean }>`
  align-items: center;
  background-color: ${({ theme, isToggled }) =>
    isToggled ? theme.color.primary : theme.color.secondary};
  box-shadow:
    inset 2px 2px 5px rgba(0, 0, 0, 0.2),
    inset -2px -2px 5px rgba(0, 0, 0, 0.5);
  border-radius: 24px;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: ${({ isToggled }) => (isToggled ? 'row-reverse' : 'row')};
  height: 48px;
  outline: none;
  padding: 4px;
  position: relative;
  width: 170px;
`

export const Text = styled.span<{ isToggled: boolean }>`
  font-size: var(--font-size-xs-sm);
  font-weight: var(--font-weight-semi-bold);
  color: ${({ theme }) => theme.text.white};
  flex: 1;
`

export const Slider = styled.div<{ isToggled: boolean }>`
  align-items: center;
  background: white;
  border-radius: 50%;
  display: flex;
  height: 40px;
  justify-content: center;
  width: 40px;
`
