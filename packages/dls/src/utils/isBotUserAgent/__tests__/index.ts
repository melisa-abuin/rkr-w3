import { isBotUserAgent } from '..'

describe('isBotUserAgent', () => {
  it.each([
    'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
    'Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)',
    'facebookexternalhit/1.1',
    'curl/8.4.0',
    'python-requests/2.31.0',
    'Mozilla/5.0 (X11; Linux x86_64) HeadlessChrome/120.0.0.0 Safari/537.36',
  ])('returns true for %s', (userAgent) => {
    expect(isBotUserAgent(userAgent)).toBe(true)
  })

  it.each([
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0',
  ])('returns false for %s', (userAgent) => {
    expect(isBotUserAgent(userAgent)).toBe(false)
  })

  it('returns true when the user agent is missing or blank', () => {
    expect(isBotUserAgent(undefined)).toBe(true)
    expect(isBotUserAgent(null)).toBe(true)
    expect(isBotUserAgent('   ')).toBe(true)
  })
})
