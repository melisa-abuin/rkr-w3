import { getSession } from '@/lib/session'
import PageContainer from '@rkr/dls/components/atoms/pageContainer'
import PageHeader from '@rkr/dls/components/atoms/pageHeader'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function AdminPage() {
  const token = (await cookies()).get('admin_session')?.value
  const user = token ? await getSession(token) : null

  if (!user) {
    redirect('/login')
  }

  return (
    <main>
      <PageContainer>
        <PageHeader
          description={`Logged in as ${user.username}`}
          title="RKR Admin"
        />
      </PageContainer>
    </main>
  )
}
