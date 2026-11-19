import type { Feedback } from '@/interfaces/feedback'
import type { PageViewStat } from '@/interfaces/pageView'

export const routes = {
  announcement: {
    label: 'Announcement',
    pathname: '/',
    url: '/',
    target: '_self',
    isNew: false,
    method: 'get',
  },
  stats: {
    label: 'Stats',
    pathname: '/stats',
    url: '/stats',
    target: '_self',
    isNew: false,
    method: 'get',
  },
  feedback: {
    label: 'Feedback',
    pathname: '/feedback',
    url: '/feedback',
    target: '_self',
    isNew: false,
    method: 'get',
  },
  logout: {
    label: 'Logout',
    pathname: '/api/auth/logout',
    url: '/api/auth/logout',
    target: '_self',
    isNew: false,
    method: 'post',
  },
} as const

export const pageViewPageSize = 10

export const pageViewColumns: Array<{
  title: string
  key: keyof PageViewStat
}> = [
  { title: 'Route', key: 'route' },
  { title: 'Views', key: 'views' },
  { title: 'Unique Views', key: 'uniqueViews' },
  { title: 'Bot Views', key: 'botViews' },
]

export const feedbackPageSize = 10

export const feedbackColumns: Array<{
  title: string
  key: keyof Feedback
}> = [
  { title: 'Type', key: 'type' },
  { title: 'Title', key: 'title' },
  { title: 'Description', key: 'description' },
  { title: 'Name', key: 'name' },
]
