import styled from 'styled-components'

export const Container = styled.header`
  align-items: flex-start;
  background-color: ${({ theme }) => theme.background.primary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 120px;
  padding-bottom: 24px;
  width: 100%;
`

export const Badges = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 1000px;
  text-align: left;
  width: 100%;
`

export const Title = styled.h1`
  color: ${({ theme }) => theme.text.primary};
  font-size: var(--font-size-xl);
  margin-bottom: 1rem;
`

export const ColorBadge = styled.span<{
  background: string
  color?: string
  capitalize?: boolean
}>`
  background-color: ${({ background }) => background};
  border-radius: 4px;
  font-size: var(--font-size-xs);
  color: ${({ theme, color }) => (color ? color : theme.text.primary)};
  padding: 6px 8px;
  text-transform: ${({ capitalize }) => (capitalize ? 'capitalize' : 'none')};
`
