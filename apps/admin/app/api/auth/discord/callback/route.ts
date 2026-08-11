import { NextRequest, NextResponse } from 'next/server'

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID!
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET!
const DISCORD_REDIRECT_URI = process.env.DISCORD_REDIRECT_URI!
const DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID!
const DISCORD_ADMIN_ROLE_IDS = process.env.DISCORD_ADMIN_ROLE_IDS!.split(',')
const SESSION_SECRET = process.env.BETTER_AUTH_SECRET!

export async function GET(request: NextRequest) {
  console.log('hey')
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const storedState = request.cookies.get('discord_oauth_state')?.value

  if (!code || !state || state !== storedState) {
    return NextResponse.redirect(new URL('/login?error=true', request.url))
  }

  const token = await fetch('https://discord.com/api/oauth2/token', {
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

  if (!token.ok) {
    return NextResponse.redirect(new URL('/login?error=true', request.url))
  }

  const { access_token } = await token.json()

  const [userResponse, memberResponse] = await Promise.all([
    fetch('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${access_token}` },
    }),
    fetch(
      `https://discord.com/api/users/@me/guilds/${DISCORD_GUILD_ID}/member`,
      {
        headers: { Authorization: `Bearer ${access_token}` },
      },
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
    return NextResponse.redirect(new URL('/login?error=true', request.url))
  }

  const response = NextResponse.redirect(new URL('/', request.url))

  return response

  /*



  const user = await userRes.json()
  const member = await memberRes.json()

  const hasAdminRole = (member.roles as string[]).some((role) =>
    DISCORD_ADMIN_ROLE_IDS.includes(role.trim()),
  )

  if (!hasAdminRole) {
    return NextResponse.redirect(
      new URL('/login?error=unauthorized', request.url),
    )
  }

  const sessionCookie = await signSession(
    { userId: user.id, username: user.username, avatar: user.avatar },
    SESSION_SECRET,
  )

  const response = NextResponse.redirect(new URL('/', request.url))
  response.cookies.delete('discord_oauth_state')
  response.cookies.set('admin_session', sessionCookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60,
    path: '/',
  })

  return response*/
}

async function signSession(data: object, secret: string): Promise<string> {
  const encoder = new TextEncoder()
  const payload = toBase64url(encoder.encode(JSON.stringify(data)))
  const key = await globalThis.crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const sig = await globalThis.crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(payload),
  )
  return `${payload}.${toBase64url(new Uint8Array(sig))}`
}

function toBase64url(bytes: Uint8Array): string {
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}
