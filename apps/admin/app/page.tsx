import AnnouncementForm from '@/app/components/announcementForm'
import pool from '@/lib/db'
import { getSession } from '@/lib/session'
import PageContainer from '@rkr/dls/components/atoms/pageContainer'
import PageHeader from '@rkr/dls/components/atoms/pageHeader'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function getAnnouncement() {
  try {
    const { rows } = await pool.query(
      'SELECT title, subtitle, is_active FROM announcement WHERE id = 1',
    )
    if (!rows[0]) return { title: '', subtitle: '', isActive: false }
    return {
      title: rows[0].title as string,
      subtitle: rows[0].subtitle as string,
      isActive: rows[0].is_active as boolean,
    }
  } catch (e) {
    console.error(e)
    return { title: '', subtitle: '', isActive: false }
  }
}

export default async function AdminPage() {
  const token = (await cookies()).get('admin_session')?.value
  const user = token ? await getSession(token) : null

  if (!user) {
    redirect('/login')
  }

  const announcement = await getAnnouncement()

  return (
    <main>
      <PageContainer>
        <PageHeader
          description={`Logged in as ${user.username}`}
          title="RKR Admin"
        />

        <AnnouncementForm
          initialIsActive={announcement.isActive}
          initialSubtitle={announcement.subtitle}
          initialTitle={announcement.title}
        />
      </PageContainer>
    </main>
  )
}
