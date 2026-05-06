import { mockApiData, mockGameApiData } from '@/constants/mock'
import { removeBlacklistedPlayers } from '../removeBlacklistedPlayers'

interface CacheEntry {
  data: unknown
  timestamp: number
}

// In-memory cache for API responses
const responseCache = new Map<string, CacheEntry>()
const CACHE_TTL = 8 * 60 * 1000 // 8 minutes in milliseconds

/**
 * Generates a cache key from the URL and params.
 */
const getCacheKey = (url?: string, params?: string): string => {
  return `${url || 'default'}${params ? `:${params}` : ''}`
}

/**
 * Checks if a cache entry is still valid based on TTL.
 */
const isCacheValid = (entry: CacheEntry): boolean => {
  const age = Date.now() - entry.timestamp
  return age < CACHE_TTL
}

/**
 * Fetches data from a provided API endpoint or returns mocked data in development.
 *
 * If the environment is set to development, it returns mock data depending on the endpoint.
 * Otherwise, it fetches from the real API using the base URL from environment variables.
 * It also filters out any blacklisted players before returning the data.
 * Responses are cached in-memory for 8 minutes to prevent redundant API calls.
 *
 * @param url - Optional relative endpoint to append to the base API URL.
 * @param params - Optional query parameters to append to the URL.
 * @returns A promise resolving to the fetched or mocked data array.
 */

export const fetchData = async (
  url?: string | undefined,
  params?: string | undefined,
) => {
  const cacheKey = getCacheKey(url, params)
  const cached = responseCache.get(cacheKey)

  // Return cached data if valid
  if (cached && isCacheValid(cached)) {
    return cached.data
  }

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
      if (!Array.isArray(data)) {
        responseCache.set(cacheKey, { data, timestamp: Date.now() })
        return data
      }
      data = removeBlacklistedPlayers(data)
    }

    // Cache the response
    responseCache.set(cacheKey, { data, timestamp: Date.now() })
  } catch (error) {
    console.error('Error fetching data:', error)
  }

  return data
}
