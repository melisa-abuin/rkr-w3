import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getSession, type SessionUser } from './session'

export async function requireUser(): Promise<SessionUser> {
  const token = (await cookies()).get('admin_session')?.value
  const user = token ? await getSession(token) : null

  if (!user) {
    redirect('/login')
  }

  return user
}
