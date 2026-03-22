import styled from 'styled-components'

export const Number = styled.div<{ color: string; small?: boolean }>`
  align-items: center;
  border-right: 1px solid ${({ color }) => color};
  color: ${({ color }) => color};
  display: flex;
  height: ${({ small }) => (small ? '32' : '48')}px;
  justify-content: flex-start;
  padding: 8px 8px 8px 0;
  text-align: center;
  width: 24px;

  @media (max-width: 480px) {
    height: 32px;
  }
`
