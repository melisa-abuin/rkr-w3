import pool from '@/lib/db'
import { requireAdminSession } from '@/lib/session'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const authenticationError = await requireAdminSession(request)
  if (authenticationError) return authenticationError

  const body = await request.json()
  const title = String(body.title ?? '')
  const subtitle = String(body.subtitle ?? '')
  const isActive = Boolean(body.isActive)

  await pool.query(
    `INSERT INTO announcement (id, title, subtitle, is_active, updated_at)
     VALUES (1, $1, $2, $3, NOW())
     ON CONFLICT (id) DO UPDATE
     SET title = $1, subtitle = $2, is_active = $3, updated_at = NOW()`,
    [title, subtitle, isActive],
  )

  return NextResponse.json({ success: true })
}
