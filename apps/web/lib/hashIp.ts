import { createHmac } from 'crypto'

export const hashIp = (ip: string): string => {
  const secret = process.env.IP_HMAC_SECRET
  if (!secret) throw new Error('IP_HMAC_SECRET is not set')
  return createHmac('sha256', secret).update(ip).digest('hex')
}
