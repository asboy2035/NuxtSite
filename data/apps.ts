import type { AppCategory } from ':/appsViews'

export const apps: AppCategory[] = [
  {
    name: 'Mac Apps',
    icon: 'solar:laptop-line-duotone',
    apps: [
      {
        name: 'Stand',
        description: 'A Mac app for standing desks.',
        image: '/images/icons/Stand-Icon.png',
        link: '/apps/stand',
      },
      {
        name: 'SerialPlotter',
        description: 'A beautiful serial plotter for Mac.',
        image: '/images/icons/Serial-Icon.png',
        link: 'https://l.a35.dev/serialp',
      },
    ],
  },
]
