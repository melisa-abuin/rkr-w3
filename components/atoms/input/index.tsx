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
  placeholder: string
  value: string
}

export default function Input({
  id,
  leftIcon,
  name,
  onChange,
  onCrossClick,
  placeholder,
  value,
}: Props) {
  const [theme] = useTheme()

  return (
    <Wrapper>
      {leftIcon}
      <StyledInput
        id={id}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        autoComplete="off"
      />
      {value.length > 0 && onCrossClick && (
        <ClearIconContainer onClick={onCrossClick}>
          <Cross height={16} fill={theme.text.primary} width={16} />
        </ClearIconContainer>
      )}
    </Wrapper>
  )
}
