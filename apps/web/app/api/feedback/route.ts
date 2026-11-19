import { NextRequest, NextResponse } from 'next/server'
import { feedbackTypes } from '../../../constants'
import { postFeedback } from '../../../lib/feedback'
import { getClientIp } from '../../../lib/getClientIp'

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)
  const type = String(body?.type ?? '')
  const title = String(body?.title ?? '').trim()
  const description = String(body?.description ?? '').trim()
  const name = String(body?.name ?? '').trim() || 'Anonymous'

  if (!feedbackTypes.includes(type) || !title || !description) {
    return NextResponse.json({ error: 'Invalid feedback' }, { status: 400 })
  }

  try {
    // Rate limited requests still succeed so the limit isn't revealed
    await postFeedback(
      { description, name, title, type },
      getClientIp(request.headers) ?? 'unknown',
    )
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Failed to post feedback:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
