import styled from 'styled-components'

export const Container = styled.header`
  align-items: flex-start;
  background-color: ${({ theme }) => theme.background.primary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 120px;
  width: 100%;
`

export const Badges = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: row;
  max-width: 1000px;
  text-align: left;
  width: 100%;
`

export const Title = styled.h1`
  color: ${({ theme }) => theme.text.primary};
  font-size: var(--font-size-xl);
  margin-bottom: 1rem;
`
export const SkinBadge = styled.span`
  border: 1px solid ${({ theme }) => theme.text.primary};
  font-size: var(--font-size-xs);
  border-radius: 4px;
  color: ${({ theme }) => theme.text.primary};
  padding: 6px 8px;
`

export const ColorBadge = styled.span<{
  color: string
}>`
  border: 1px solid ${({ theme }) => theme.text.primary};
  background-color: ${({ color }) => color};
  border-radius: 4px;
  font-size: var(--font-size-xs);
  color: ${({ theme }) => theme.text.primary};
  padding: 6px 8px;
  text-transform: capitalize;
`
