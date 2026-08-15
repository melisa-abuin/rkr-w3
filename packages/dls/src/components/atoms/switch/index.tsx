import type { ChangeEventHandler } from 'react'
import styles from './index.module.css'

type SwitchProps = {
  checked: boolean
  id: string
  label?: string
  name: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

export default function Switch({
  checked,
  id,
  label,
  name,
  onChange,
}: SwitchProps) {
  return (
    <div className={label ? styles.container : undefined}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      <input
        checked={checked}
        className={styles.switch}
        id={id}
        name={name}
        type="checkbox"
        onChange={onChange}
      />
    </div>
  )
}
