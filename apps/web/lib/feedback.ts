import {
  maxFeedbackDescriptionLength,
  maxFeedbackNameLength,
  maxFeedbackPerDay,
  maxFeedbackTitleLength,
} from '../constants'
import pool from './db'
import { hashIp } from './hashIp'
import { consumeRateLimit } from './rateLimit'

export interface FeedbackInput {
  description: string
  name: string
  title: string
  type: string
}

// Returns false when the visitor reached the daily limit and nothing was stored
export async function postFeedback(
  { description, name, title, type }: FeedbackInput,
  ip: string,
): Promise<boolean> {
  if (!consumeRateLimit(hashIp(ip.toLowerCase()), maxFeedbackPerDay)) {
    return false
  }

  await pool.query(
    'INSERT INTO feedback (type, title, description, name) VALUES ($1, $2, $3, $4)',
    [
      type,
      title.slice(0, maxFeedbackTitleLength),
      description.slice(0, maxFeedbackDescriptionLength),
      name.slice(0, maxFeedbackNameLength),
    ],
  )

  return true
}
