import styled from 'styled-components'

export const Container = styled.p<{ color?: string; isSmall?: boolean }>`
  align-items: center;
  display: flex;
  flex-direction: row;
  font-size: ${({ isSmall }) =>
    isSmall ? 'var(--font-size-xs)' : 'var(--font-size-sm)'};
  font-weight: ${({ isSmall }) =>
    isSmall ? 'var(--font-weight-regular)' : 'var(--font-weight-semi-bold)'};
  gap: 4px;
  justify-content: center;
  color: ${({ color, theme }) => (color ? color : theme.text.secondary)};
  margin-top: 10px;
  margin-bottom: 4px;
`
