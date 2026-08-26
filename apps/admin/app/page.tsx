import { getAnnouncement } from '@/lib/announcement'
import { getSession } from '@/lib/session'
import PageContainer from '@rkr/dls/components/atoms/pageContainer'
import PageHeader from '@rkr/dls/components/atoms/pageHeader'
import AnnouncementForm from '@rkr/dls/components/organisms/announcementForm'
import LeagueForm from '@rkr/dls/components/organisms/leagueForm'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

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
        <PageContainer title="Announcement" withPadding={false}>
          <AnnouncementForm
            initialIsActive={announcement.isActive}
            initialSubtitle={announcement.subtitle}
            initialTitle={announcement.title}
          />
        </PageContainer>
        <PageContainer title="League Calculations" withPadding={false}>
          <LeagueForm
            initialContent=""
            initialIsActive={false}
            initialTitle=""
          />
        </PageContainer>
      </PageContainer>
    </main>
  )
}
