import type { Feedback, FeedbackPage } from '@/interfaces/feedback'
import { feedbackPageSize } from '../constants'
import pool from './db'

const logError = (e: unknown) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error(e)
  }
}

const formatDate = (date: Date) =>
  `${date.toISOString().slice(0, 16).replace('T', ' ')} UTC`

export async function getFeedbackPage(
  requestedPage: number,
): Promise<FeedbackPage> {
  try {
    const { rows: countRows } = await pool.query(
      'SELECT COUNT(*) AS total FROM feedback',
    )
    const totalPages = Math.max(
      1,
      Math.ceil(Number(countRows[0].total) / feedbackPageSize),
    )
    const page = Math.min(requestedPage, totalPages)

    const { rows } = await pool.query(
      `
      SELECT id, type, title, description, name, status, created_at
      FROM feedback
      ORDER BY created_at DESC, id DESC
      LIMIT $1 OFFSET $2
      `,
      [feedbackPageSize, (page - 1) * feedbackPageSize],
    )

    const feedback: Feedback[] = rows.map((row) => ({
      id: Number(row.id),
      type: row.type,
      title: row.title,
      description: row.description,
      name: row.name,
      status: row.status,
      createdAt: formatDate(row.created_at),
    }))

    return { feedback, page, totalPages }
  } catch (e) {
    logError(e)
    return { feedback: [], page: 1, totalPages: 1 }
  }
}
