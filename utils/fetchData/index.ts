import { mockApiData } from '@/constants/mock'
import { removeBlacklistedPlayers } from '../removeBlacklistedPlayers'

export const fetchData = async (
  url?: string | undefined,
  params?: string | undefined,
) => {
  const apiBaseUrl = process.env.API_URL
  let data = []

  try {
    if (!apiBaseUrl) {
      throw new Error('Please provide a valid api URL')
    }
    const apiUrl = `${apiBaseUrl}${url || ''}${params ? `?${params}` : ''}`

    if (process.env.ENVIRONMENT === 'development') {
      console.warn(
        'Currently using mocked data, to call the production enpoint directly change it from .env',
      )
      data = mockApiData
    } else {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      data = await response.json()
      return removeBlacklistedPlayers(data)
    }
  } catch (error) {
    console.error('Error fetching scoreboard data:', error)
  }

  return data
}
