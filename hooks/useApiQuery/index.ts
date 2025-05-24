import { useQuery, UseQueryOptions } from '@tanstack/react-query'

type QueryParams = Record<string, any>

const buildUrl = (url: string, params?: QueryParams) => {
  if (!params) return url
  const searchParams = new URLSearchParams(params).toString()
  return `${url}?${searchParams}`
}

export const useApiQuery = <TData = unknown>(
  url: string,
  params?: QueryParams,
  options?: UseQueryOptions<TData>,
) => {
  return useQuery<TData>({
    queryKey: [url, params],
    queryFn: async () => {
      const finalUrl = buildUrl(url, params)
      const res = await fetch(finalUrl)
      if (!res.ok) {
        throw new Error(`Error fetching ${finalUrl}: ${res.statusText}`)
      }
      const data = (await res.json()) as TData
      return data
    },
    ...options,
  })
}
