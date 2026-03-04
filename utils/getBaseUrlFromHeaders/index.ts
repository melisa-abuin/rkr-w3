'use server'

import { headers } from 'next/headers'

/**
 * Returns the absolute base URL for the current server request.
 *
 * It uses request headers (`x-forwarded-proto` and `host`) to construct
 * the URL in normal environments. In stage, it falls back to the
 * canonical Vercel domain to support feature-instance requests.
 */
export const getBaseUrlFromHeaders = async () => {
  const headersList = await headers()
  const protocol = headersList.get('x-forwarded-proto') || 'http'
  const host = headersList.get('host')
  const isStage = process.env.ENVIRONMENT === 'stage'

  return isStage ? 'https://rkr-w3.vercel.app' : `${protocol}://${host}`
}
