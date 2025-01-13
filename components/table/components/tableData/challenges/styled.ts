import styled from 'styled-components'

export const Container = styled.div<{ color?: string }>`
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 4px;
  justify-content: center;
  color: ${({ color, theme }) => (color ? color : theme.text.primary)};
`
