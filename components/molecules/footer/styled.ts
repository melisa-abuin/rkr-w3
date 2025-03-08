import styled from 'styled-components'

export const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.color.black};
  color: ${({ theme }) => theme.text.white};
  padding: 20px;
  text-align: center;
  font-size: var(--font-size-xs);
  line-height: 1.5;
`
