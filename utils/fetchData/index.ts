import { mockApiData, mockGameApiData } from '@/constants/mock'
import { removeBlacklistedPlayers } from '../removeBlacklistedPlayers'

/**
 * Fetches data from a provided API endpoint or returns mocked data in development.
 *
 * If the environment is set to development, it returns mock data depending on the endpoint.
 * Otherwise, it fetches from the real API using the base URL from environment variables.
 * It also filters out any blacklisted players before returning the data.
 *
 * @param url - Optional relative endpoint to append to the base API URL.
 * @param params - Optional query parameters to append to the URL.
 * @returns A promise resolving to the fetched or mocked data array.
 */

export const fetchData = async (
  url?: string | undefined,
  params?: string | undefined,
) => {
  const apiBaseUrl = process.env.API_URL
  const isDev = process.env.ENVIRONMENT === 'development'

  let data = []

  try {
    if (!apiBaseUrl && !isDev) {
      throw new Error('Please provide a valid api URL')
    }
    const apiUrl = `${apiBaseUrl}${url || ''}${params ? `?${params}` : ''}`

    if (isDev) {
      console.warn(
        'Currently using mocked data, to call the production enpoint directly change it from .env',
      )
      data = url === 'gametimes' ? mockGameApiData : mockApiData
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
    console.error('Error fetching data:', error)
  }

  return data
}
