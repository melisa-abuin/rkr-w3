import styled from 'styled-components'

export const Content = styled.table`
  width: 100%;
  font-size: var(--font-size-xs);
  border-collapse: collapse;

  td {
    padding: 4px;
    background-color: ${({ theme }) => theme.background.primary};
  }

  td:first-child {
    font-weight: var(--font-weight-bold);
  }
`
export const Text = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;

  & span {
    font-size: var(--font-size-xs-sm);
    font-weight: var(--font-weight-regular);
  }
`
