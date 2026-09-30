'use client'

import Dropdown, { type DropdownOption } from '@/components/atoms/dropdown'
import Switch from '@/components/atoms/switch'
import type { BotFilter, PageViewFilters } from '@/interfaces/pageView'
import styles from './index.module.css'

interface PageViewFiltersBarProps {
  filters: PageViewFilters
  monthOptions: DropdownOption[]
  onChange: (patch: Partial<PageViewFilters>) => void
}

const botOptions: Array<DropdownOption & { value: BotFilter }> = [
  { label: 'All traffic', value: 'all' },
  { label: 'Humans only', value: 'humans' },
  { label: 'Bots only', value: 'bots' },
]

export default function PageViewFiltersBar({
  filters,
  monthOptions,
  onChange,
}: PageViewFiltersBarProps) {
  return (
    <div className={styles.container}>
      <div className={styles.field}>
        <span className={styles.label}>Month</span>
        <Dropdown
          key={filters.month}
          defaultOption={
            monthOptions.find(({ value }) => value === filters.month) ?? {
              label: filters.month,
              value: filters.month,
            }
          }
          options={monthOptions}
          onSelect={({ value }) => onChange({ month: value })}
        />
      </div>
      <div className={styles.field}>
        <span className={styles.label}>Traffic</span>
        <Dropdown
          key={filters.bots}
          defaultOption={botOptions.find(({ value }) => value === filters.bots)}
          options={botOptions}
          onSelect={({ value }) => onChange({ bots: value as BotFilter })}
        />
      </div>
      <Switch
        checked={filters.groupPlayers}
        id="groupPlayers"
        label="Group player pages"
        name="groupPlayers"
        onChange={(e) => onChange({ groupPlayers: e.target.checked })}
      />
    </div>
  )
}
