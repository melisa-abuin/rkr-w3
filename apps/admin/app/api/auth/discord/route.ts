import { NextResponse } from 'next/server'

export async function GET() {
  const state = bufToHex(globalThis.crypto.getRandomValues(new Uint8Array(16)))

  const params = new URLSearchParams({
    client_id: process.env.DISCORD_CLIENT_ID!,
    redirect_uri: process.env.DISCORD_REDIRECT_URI!,
    response_type: 'code',
    scope: 'identify guilds.members.read',
    state,
  })

  const response = NextResponse.redirect(
    `https://discord.com/api/oauth2/authorize?${params}`,
  )

  response.cookies.set('discord_oauth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 600,
    path: '/',
  })

  return response
}

function bufToHex(buf: Uint8Array): string {
  return Array.from(buf)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}
