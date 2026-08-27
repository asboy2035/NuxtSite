import type { AppCategory } from ':/appsViews'

export const apps: AppCategory[] = [
  {
    name: 'Mac Apps',
    icon: 'solar:laptop-line-duotone',
    apps: [
      {
        image: 'https://a35hie.com/icons/apps/stand.webp',
        name: 'apps.stand.title',
        description: 'apps.stand.description',
        link: '/work/stand',
      },
      {
        image: 'https://a35hie.com/icons/apps/serialplotter.webp',
        name: 'apps.serialplotter.title',
        description: 'apps.serialplotter.description',
        link: 'https://guides.a35hie.me/apps/mac-apps/serialplotter',
      },
      {
        image: 'https://a35hie.com/icons/apps/serialbridge.webp',
        name: 'apps.serialbridge.title',
        description: 'apps.serialbridge.description',
        link: 'https://guides.a35hie.me/apps/mac-apps/serialplotter',
      },
      {
        image: 'https://a35hie.com/icons/apps/sideeye.webp',
        name: 'apps.sideeye.title',
        description: 'apps.sideeye.description',
        link: 'https://repos.a35hie.me/SideEye',
      },
      {
        image: 'https://a35hie.com/icons/apps/backed.webp',
        name: 'apps.backed.title',
        description: 'apps.backed.description',
        link: 'https://repos.a35hie.me/Backed',
      },
      {
        image: 'https://a35hie.com/icons/apps/shimetomo.webp',
        name: 'apps.shimetomo.title',
        description: 'apps.shimetomo.description',
        link: 'https://repos.a35hie.me/ShimeTomo',
      },
    ],
  },
]
