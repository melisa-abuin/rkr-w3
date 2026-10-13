'use client'

import type { DropdownOption } from '@/components/atoms/dropdown'
import PageViewFilters from '@/components/organisms/pageViewFilters'
import { usePageViewFilters } from '@/hooks/usePageViewFilters'

interface PageViewFiltersContainerProps {
  monthOptions: DropdownOption[]
}

export default function PageViewFiltersContainer({
  monthOptions,
}: PageViewFiltersContainerProps) {
  const { filters, updateFilters } = usePageViewFilters()

  return (
    <PageViewFilters
      filters={filters}
      monthOptions={monthOptions}
      onChange={updateFilters}
    />
  )
}
