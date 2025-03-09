import styled from 'styled-components'

export const Number = styled.div<{ color: string; small?: boolean }>`
  align-items: center;
  border-radius: 5px;
  border: 1px solid ${({ color }) => color};
  color: ${({ color }) => color};
  display: flex;
  height: ${({ small }) => (small ? '32' : '48')}px;
  justify-content: center;
  padding: 8px;
  text-align: center;
  width: ${({ small }) => (small ? '32' : '48')}px;

  @media (max-width: 480px) {
    height: 32px;
    width: 32px;
  }
`
