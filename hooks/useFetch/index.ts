import { useState, useEffect } from 'react'

interface FetchState<T> {
  data: T | null
  error: string | null
  loading: boolean
}

export const useFetch = <T>(url: string, options?: RequestInit) => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    error: null,
    loading: true,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const data: T = await response.json()
        setState({ data, error: null, loading: false })
      } catch (error) {
        console.log(error)
        setState({
          data: null,
          error: (error as Error).message,
          loading: false,
        })
      }
    }

    fetchData()
  }, [url, options])

  return state
}
