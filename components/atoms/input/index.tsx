'use client'

import React, { ReactNode } from 'react'
import { ClearIconContainer, StyledInput, Wrapper } from './styled'
import { useTheme } from '@/hooks/useTheme'
import { Cross } from '@/components/icons/cross'

interface Props {
  id: string
  leftIcon?: ReactNode
  name: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onCrossClick?: () => void
  onFocus?: () => void
  placeholder: string
  value: string
}

export default function Input({
  id,
  leftIcon,
  name,
  onChange,
  onCrossClick,
  onFocus,
  placeholder,
  value,
}: Props) {
  const [theme] = useTheme()

  return (
    <Wrapper>
      {leftIcon}
      <StyledInput
        autoComplete="off"
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
      />
      {value.length > 0 && onCrossClick && (
        <ClearIconContainer onClick={onCrossClick}>
          <Cross fill={theme.text.color.primary} height={16} width={16} />
        </ClearIconContainer>
      )}
    </Wrapper>
  )
}
