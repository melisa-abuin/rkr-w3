'use client'

import { Chevron } from '@/components/icons/chevron'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import { FocusEvent, useRef, useState } from 'react'
import styles from './index.module.css'

export interface DropdownOption {
  label: string
  value: string
}

interface DropdownProps {
  options: DropdownOption[]
  defaultOption?: DropdownOption | null
  onSelect?: (option: DropdownOption) => void
}

export default function Dropdown({
  options,
  defaultOption = null,
  onSelect,
}: DropdownProps) {
  const [selected, setSelected] = useState<DropdownOption | null>(defaultOption)
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useOutsideClick(() => setIsOpen(false), ref)

  const handleSelect = (option: DropdownOption) => {
    setSelected(option)
    onSelect?.(option)
    setIsOpen(false)
  }

  const handleBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsOpen(false)
    }
  }

  return (
    <div ref={ref} className={styles.wrapper} onBlur={handleBlur}>
      <button
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={styles.trigger}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{selected?.label ?? 'Select…'}</span>
        <span className={isOpen ? styles.chevronUp : styles.chevronDown}>
          <Chevron fill="currentColor" height={12} width={12} />
        </span>
      </button>
      {isOpen && (
        <ul className={styles.list} role="listbox">
          {options.map((option) => (
            <li
              key={option.value}
              aria-selected={option.value === selected?.value}
              className={`${styles.option} ${
                option.value === selected?.value ? styles.optionSelected : ''
              }`}
              role="option"
              tabIndex={-1}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
