import LoginTemplate from '@/components/templates/login'
import { getSession } from '@/lib/session'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
  const token = (await cookies()).get('admin_session')?.value
  const user = token ? await getSession(token) : null

  if (user) {
    redirect('/')
  }

  return (
    <main>
      <LoginTemplate />
    </main>
  )
}
