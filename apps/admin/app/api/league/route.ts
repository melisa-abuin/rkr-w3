import pool from '@/lib/db'
import { requireAdminSession } from '@/lib/session'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const authenticationError = await requireAdminSession(request)
  if (authenticationError) return authenticationError

  const body = await request.json()
  const title = String(body.title ?? '')
  const content = String(body.content ?? '')
  const isActive = Boolean(body.isActive)

  await pool.query(
    `INSERT INTO league (id, title, content, is_active, updated_at)
     VALUES (1, $1, $2, $3, NOW())
     ON CONFLICT (id) DO UPDATE
     SET title = $1, content = $2, is_active = $3, updated_at = NOW()`,
    [title, content, isActive],
  )

  return NextResponse.json({ success: true })
}
