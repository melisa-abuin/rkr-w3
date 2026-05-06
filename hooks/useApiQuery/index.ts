import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query'

type QueryParams = Record<string, string>

const buildUrl = (url: string, params?: QueryParams) => {
  if (!params) return url
  const searchParams = new URLSearchParams(params).toString()
  return `${url}?${searchParams}`
}

export const useApiQuery = <TData>(
  url: string,
  params?: QueryParams,
  options?: Omit<UseQueryOptions<TData>, 'queryKey' | 'queryFn'>,
): UseQueryResult<TData> =>
  useQuery({
    ...options,
    staleTime: 8 * 60 * 1000,
    queryKey: [url, params],
    queryFn: async () => {
      const finalUrl = buildUrl(url, params)
      const res = await fetch(finalUrl)
      if (!res.ok) {
        throw new Error(`Error fetching ${finalUrl}: ${res.statusText}`)
      }
      return (await res.json()) as TData
    },
  })
