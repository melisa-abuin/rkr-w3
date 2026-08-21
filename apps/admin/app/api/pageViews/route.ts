import { getPageViewStats } from '@/lib/pageView'
import { getSession } from '@/lib/session'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const token = request.cookies.get('admin_session')?.value
  const user = token ? await getSession(token) : null
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const stats = await getPageViewStats()
  return NextResponse.json(stats)
}
