import AnnouncementForm from '@/app/components/announcementForm'
import { requireUser } from '@/lib/auth'
import { getAnnouncement } from '@/lib/announcement'
import PageContainer from '@rkr/dls/components/atoms/pageContainer'
import PageHeader from '@rkr/dls/components/atoms/pageHeader'

export default async function AdminPage() {
  const user = await requireUser()
  const announcement = await getAnnouncement()

  return (
    <main>
      <PageContainer>
        <PageHeader
          description={`Logged in as ${user.username}`}
          title="RKR Admin"
        />
        <PageContainer
          marginBottom={24}
          title="Announcement"
          withPadding={false}
        >
          <AnnouncementForm
            initialIsActive={announcement.isActive}
            initialSubtitle={announcement.subtitle}
            initialTitle={announcement.title}
          />
        </PageContainer>
      </PageContainer>
    </main>
  )
}
