export const getClientIp = (headers: Headers): string | undefined =>
  headers.get('x-real-ip') ??
  headers.get('x-forwarded-for')?.split(',')[0]?.trim()
