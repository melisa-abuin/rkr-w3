import { createSession } from '@/lib/session'
import { NextRequest, NextResponse } from 'next/server'

const DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID!
const DISCORD_ADMIN_ROLE_IDS = process.env.DISCORD_ADMIN_ROLE_IDS!.split(',')

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const storedState = request.cookies.get('discord_oauth_state')?.value

  if (!code || !state || state !== storedState) {
    return NextResponse.redirect(new URL('/login?error=true', request.url))
  }

  const tokenRes = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID!,
      client_secret: process.env.DISCORD_CLIENT_SECRET!,
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env.DISCORD_REDIRECT_URI!,
    }),
  })

  if (!tokenRes.ok) {
    return NextResponse.redirect(new URL('/login?error=true', request.url))
  }

  const { access_token } = await tokenRes.json()

  const [userResponse, memberResponse] = await Promise.all([
    fetch('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${access_token}` },
    }),
    fetch(
      `https://discord.com/api/users/@me/guilds/${DISCORD_GUILD_ID}/member`,
      { headers: { Authorization: `Bearer ${access_token}` } },
    ),
  ])

  if (!userResponse.ok || !memberResponse.ok) {
    return NextResponse.redirect(new URL('/login?error=true', request.url))
  }

  const user = await userResponse.json()
  const member = await memberResponse.json()

  const hasAdminRole = (member.roles as string[]).some((role) =>
    DISCORD_ADMIN_ROLE_IDS.includes(role.trim()),
  )

  if (!hasAdminRole) {
    return NextResponse.redirect(
      new URL('/login?error=unauthorized', request.url),
    )
  }

  const token = await createSession({
    userId: user.id,
    username: user.username,
    avatar: user.avatar ?? null,
  })

  const response = NextResponse.redirect(new URL('/', request.url))
  response.cookies.delete('discord_oauth_state')
  response.cookies.set('admin_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60,
    path: '/',
  })

  return response
}
