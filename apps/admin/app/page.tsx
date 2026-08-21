import AnnouncementForm from '@/app/components/announcementForm'
import { getAnnouncement } from '@/lib/announcement'
import { getPageViews } from '@/lib/pageView'
import { getSession } from '@/lib/session'
import PageContainer from '@rkr/dls/components/atoms/pageContainer'
import PageHeader from '@rkr/dls/components/atoms/pageHeader'
import Table from '@rkr/dls/components/molecules/table'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { pageViewColumns, pageViewPageSize, pageViewYearMs } from '../constants'

interface PageViewStat {
  route: string
  views: number
  uniqueViews: number
}

async function getPageViewStats(): Promise<PageViewStat[]> {
  const since = new Date(Date.now() - pageViewYearMs)
  return getPageViews(since)
}

export default async function AdminPage() {
  const token = (await cookies()).get('admin_session')?.value
  const user = token ? await getSession(token) : null

  if (!user) {
    redirect('/login')
  }

  const announcement = await getAnnouncement()
  const pageViewStats = await getPageViewStats()

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
        <PageContainer marginBottom={24} withPadding={false}>
          <Table<PageViewStat>
            columns={pageViewColumns}
            data={pageViewStats.slice(0, pageViewPageSize)}
            pageSize={pageViewPageSize}
            title="Main Website Page Views (Last 12 Months)"
          />
        </PageContainer>
      </PageContainer>
    </main>
  )
}
