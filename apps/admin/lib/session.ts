import { createHash, randomBytes } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import pool from './db'

export interface SessionUser {
  userId: string
  username: string
  avatar: string | null
}

const SESSION_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000

function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex')
}

export async function createSession(user: SessionUser): Promise<string> {
  const token = randomBytes(32).toString('hex')
  const expiresAt = new Date(Date.now() + SESSION_MAX_AGE_MS)
  await pool.query(
    'INSERT INTO admin_sessions (token, user_id, username, avatar, expires_at) VALUES ($1, $2, $3, $4, $5)',
    [
      hashToken(token),
      user.userId,
      user.username,
      user.avatar ?? null,
      expiresAt,
    ],
  )
  return token
}

export async function getSession(token: string): Promise<SessionUser | null> {
  const { rows } = await pool.query(
    'SELECT user_id, username, avatar FROM admin_sessions WHERE token = $1 AND expires_at > NOW()',
    [hashToken(token)],
  )
  if (!rows[0]) return null
  return {
    userId: rows[0].user_id,
    username: rows[0].username,
    avatar: rows[0].avatar,
  }
}

export async function requireAdminSession(
  request: NextRequest,
): Promise<NextResponse | null> {
  const token = request.cookies.get('admin_session')?.value
  const user = token ? await getSession(token) : null

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return null
}

export async function deleteSession(token: string): Promise<void> {
  await pool.query('DELETE FROM admin_sessions WHERE token = $1', [
    hashToken(token),
  ])
}
