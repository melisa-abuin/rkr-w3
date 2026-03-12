import styled from 'styled-components'

export const Container = styled.div<{ highlighted: boolean }>`
  color: ${({ highlighted, theme }) =>
    highlighted ? theme.color.green : theme.text.primary};
`
