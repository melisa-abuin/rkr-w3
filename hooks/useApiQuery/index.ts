import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query'

type QueryParams = Record<string, any>

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
    staleTime: 3000 * 60, // make it a param
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
