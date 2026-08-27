export type AppLink = {
  title: string
  url: string
  type: 'appstore' | 'github' | 'link'
}

export type AppPageMeta = {
  slug: string
  title: string
  shortDescription: string
  ogDescription: string
  iconPath: string
  headerImagePath: string
  socialPreview: string
  longDescriptionMarkdown: string
  updatedBadge?: string
  appLinks?: AppLink[]
  brewCmd?: string
}

export const appsPages: AppPageMeta[] = [
  {
    slug: 'stand',
    title: 'Stand',
    shortDescription: 'Keep track of sitting/standing time!',
    ogDescription: 'Keep track of sitting/standing time!',
    iconPath: 'https://a35hie.com/icons/apps/stand.webp',
    headerImagePath: '/images/Stand-Hero.jpeg',
    socialPreview: '/apps/social-previews/Stand-SocialPreview.png',
    longDescriptionMarkdown: '/apps/markdown/stand.md',
    updatedBadge: 'Now on the App Store!',
    appLinks: [
      {
        title: 'App Store (no EU)',
        url: 'https://apps.apple.com/us/app/stand-standing-desk-app/id6741711329?mt=12',
        type: 'appstore',
      },
      {
        title: 'GitHub',
        url: 'https://github.com/a35hie/Stand/releases/latest',
        type: 'github',
      },
    ],
  },
]
