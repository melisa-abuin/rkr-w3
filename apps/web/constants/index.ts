export const routes = {
  home: {
    label: 'Home',
    pathname: '/',
    url: '/',
    target: '_self',
    isNew: false,
    method: 'get',
  },
  leaderboard: {
    label: 'Leaderboard',
    pathname: '/leaderboard',
    url: '/leaderboard',
    target: '_self',
    isNew: false,
    method: 'get',
  },
  tournaments: {
    label: 'Tournaments',
    pathname: '/tournaments',
    url: '/tournaments',
    target: '_self',
    isNew: false,
    method: 'get',
  },
  challenges: {
    label: 'Challenges',
    pathname: '/challenges',
    url: '/challenges',
    target: '_self',
    isNew: false,
    method: 'get',
  },
  guide: {
    label: 'Guide',
    pathname: '/guide',
    url: '/guide',
    target: '_self',
    isNew: false,
    method: 'get',
  },
  download: {
    label: 'Download',
    pathname:
      'https://discord.com/channels/873715731873804298/1122346045968498738',
    url: 'https://discord.com/channels/873715731873804298/1122346045968498738',
    target: '_blank',
    isNew: false,
    method: 'get',
  },
} as const

export const maxRouteLength = 255
