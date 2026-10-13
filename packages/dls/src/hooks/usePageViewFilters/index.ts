'use client'

import type { PageViewFilters } from '@/interfaces/pageView'
import { parsePageViewFilters } from '@/utils/parsePageViewFilters'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'

export const usePageViewFilters = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const filters = parsePageViewFilters(Object.fromEntries(searchParams))

  const updateFilters = (patch: Partial<PageViewFilters>) => {
    const next = { ...filters, page: 1, ...patch }
    const defaults = parsePageViewFilters({})
    const params = new URLSearchParams()

    if (next.month !== defaults.month) params.set('month', next.month)
    if (next.bots !== defaults.bots) params.set('bots', next.bots)
    if (next.groupPlayers !== defaults.groupPlayers) {
      params.set('groupPlayers', String(next.groupPlayers))
    }
    if (next.page !== defaults.page) params.set('page', String(next.page))

    const query = params.toString()
    startTransition(() => {
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      })
    })
  }

  return { filters, updateFilters, isPending }
}
