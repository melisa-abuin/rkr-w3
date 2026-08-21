import AnnouncementForm from '@/app/components/announcementForm'
import pool from '@/lib/db'
import { getPageViews } from '@/lib/pageView'
import { getSession } from '@/lib/session'
import PageContainer from '@rkr/dls/components/atoms/pageContainer'
import PageHeader from '@rkr/dls/components/atoms/pageHeader'
import Table from '@rkr/dls/components/molecules/table'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const PAGE_SIZE = 10

interface PageViewStat {
  route: string
  views: number
}

const PAGE_VIEW_COLUMNS: Array<{ title: string; key: keyof PageViewStat }> = [
  { title: 'Route', key: 'route' },
  { title: 'Views (last year)', key: 'views' },
]

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

async function getPageViewStats(): Promise<PageViewStat[]> {
  const since = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)
  const views = await getPageViews(since)
  const routeMap = new Map<string, Set<string>>()
  for (const { route, visitorId } of views) {
    if (!routeMap.has(route)) routeMap.set(route, new Set())
    routeMap.get(route)!.add(visitorId)
  }
  return [...routeMap.entries()]
    .map(([route, visitors]) => ({ route, views: visitors.size }))
    .sort((a, b) => b.views - a.views)
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
        <Table<PageViewStat>
          columns={PAGE_VIEW_COLUMNS}
          data={pageViewStats.slice(0, PAGE_SIZE)}
          pageSize={PAGE_SIZE}
          title="Page Views"
        />
      </PageContainer>
    </main>
  )
}
