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
