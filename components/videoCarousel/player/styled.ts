import styled from 'styled-components'

export const Video = styled.video`
  box-shadow: 3px 3px 8px ${({ theme }) => theme.shadow.primary};
  height: 350px;
  max-width: 600px;
  object-fit: cover;
  width: 100%;
`
