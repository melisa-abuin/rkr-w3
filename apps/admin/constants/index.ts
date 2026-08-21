export const routes = {
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

export const pageViewYearMs = 365 * 24 * 60 * 60 * 1000

export const pageViewColumns: Array<{
  title: string
  key: 'route' | 'views' | 'uniqueViews'
}> = [
  { title: 'Route', key: 'route' },
  { title: 'Views', key: 'views' },
  { title: 'Unique Views', key: 'uniqueViews' },
]
