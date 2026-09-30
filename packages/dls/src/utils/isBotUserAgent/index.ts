const botPattern =
  /bot|crawl|spider|slurp|scrape|headless|lighthouse|pingdom|uptime|monitor|preview|facebookexternalhit|embedly|curl\/|wget|python-requests|python-urllib|aiohttp|httpx|axios|node-fetch|undici|go-http-client|okhttp|java\/|libwww|httpclient|postman/i

/**
 * Detects whether a user agent string belongs to a bot, crawler or HTTP client.
 *
 * @param userAgent - Raw `User-Agent` header value.
 * @returns `true` for known bot signatures and for a missing/empty user agent.
 */
export const isBotUserAgent = (userAgent?: string | null): boolean => {
  if (!userAgent || !userAgent.trim()) return true
  return botPattern.test(userAgent)
}
